using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Reservations.Commands.ApproveReservation
{
    public class ApproveReservationCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class ApproveReservationCommandHandler : IRequestHandler<ApproveReservationCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public ApproveReservationCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(ApproveReservationCommand request, CancellationToken cancellationToken)
        {
            var reservation = await _context.Reservations.SingleOrDefaultAsync(r => r.Id == request.Id);

            if (reservation == null)
            {
                throw new NotFoundException(nameof(Reservation), request.Id);
            }

            var hairSalon = await _context.HairSalons.FindAsync(reservation.HairSalonId);

            var isAdmin = await _identityService.CheckIfUserIsAdmin();
            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(hairSalon);

            if (!isOwner && !isAdmin)
            {
                throw new Exception("Bad client");
            }

            reservation.Status = await _context.ReservationStatuses.SingleOrDefaultAsync(rs => rs.Status == Status.Accepted);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}