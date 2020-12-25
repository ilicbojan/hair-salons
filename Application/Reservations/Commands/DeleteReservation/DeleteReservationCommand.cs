using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Reservations.Commands.DeleteReservation
{
    public class DeleteReservationCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteReservationCommandHandler : IRequestHandler<DeleteReservationCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICurrentUserService _currentUserService;

        public DeleteReservationCommandHandler(IAppDbContext context, IIdentityService identityService, UserManager<AppUser> userManager, ICurrentUserService currentUserService)
        {
            _context = context;
            _identityService = identityService;
            _userManager = userManager;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(DeleteReservationCommand request, CancellationToken cancellationToken)
        {
            var reservation = await _context.Reservations.SingleOrDefaultAsync(r => r.Id == request.Id);

            if (reservation == null)
            {
                throw new NotFoundException(nameof(Reservation), request.Id);
            }

            var hairSalon = await _context.HairSalons.FindAsync(reservation.HairSalonId);

            var user = await _context.Users.FindAsync(_currentUserService.UserId);
            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(hairSalon);
            var isAdmin = await _userManager.IsInRoleAsync(user, RolesEnum.Admin);

            if (!isOwner && !isAdmin)
            {
                var today = DateTime.Now.Date;
                var time = DateTime.Now.TimeOfDay;

                if (reservation.Status.Status == Status.Accepted)
                {
                    if (reservation.Date < today || (reservation.Date == today && reservation.StartTime < time))
                    {
                        throw new Exception("Ne mozete obrisati rezervacije koje su prosle");
                    }
                }

                if (reservation.Date == today || (reservation.Date.AddDays(-1) == today && reservation.StartTime < time))
                {
                    throw new Exception("Ne mozete otkazati rezervaciju 24h pre pocetka termina. Kontaktirajte frizerski salon: " + hairSalon.Phone);
                }
            } 

            _context.Reservations.Remove(reservation);
            

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}