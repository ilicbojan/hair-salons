using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Reservations.Commands.CreateReservation
{
    public class CreateReservationCommand : IRequest<int>
    {
        public int HairSalonId { get; set; }
        public string StartTime { get; set; }
        public string Date { get; set; }
        public int? Price { get; set; }
    }

    public class CreateReservationCommandHandler : IRequestHandler<CreateReservationCommand, int>
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IIdentityService _identityService;
        private readonly UserManager<AppUser> _userManager;

        public CreateReservationCommandHandler(IAppDbContext context, ICurrentUserService currentUserService, IIdentityService identityService, UserManager<AppUser> userManager)
        {
            _currentUserService = currentUserService;
            _identityService = identityService;
            _userManager = userManager;
            _context = context;
        }

        public async Task<int> Handle(CreateReservationCommand request, CancellationToken cancellationToken)
        {
            var hairSalon = await _context.HairSalons.FindAsync(request.HairSalonId);

            if (hairSalon == null)
            {
                throw new NotFoundException(nameof(HairSalon), request.HairSalonId);
            }

            if (!hairSalon.IsPayed && !hairSalon.IsPremium)
            {
                throw new Exception("Frizerski salon nije premium");
            }

            var startTime = TimeSpan.Parse(request.StartTime);
            var endTime = startTime.Add(TimeSpan.FromMinutes(30));

            if (startTime.Hours == 23)
            {
                endTime = new TimeSpan(0, 0, 0);
            }

            var date = DateTime.Parse(request.Date);

            var user = await _context.Users.FindAsync(_currentUserService.UserId);
            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(hairSalon);
            var isAdmin = await _userManager.IsInRoleAsync(user, RolesEnum.Admin);

            ReservationStatus status;

            if (isOwner || isAdmin)
            {
                status = await _context.ReservationStatuses.SingleOrDefaultAsync(rs => rs.Status == Status.Accepted);
            } 
            else
            {
                status = await _context.ReservationStatuses.SingleOrDefaultAsync(rs => rs.Status == Status.Pending);
            }

            var reservation = new Reservation
            {
                HairSalonId = request.HairSalonId,
                UserId = _currentUserService.UserId,
                StartTime = startTime,
                EndTime = endTime,
                Date = date,
                CreatedAt = DateTime.Now,
                StatusId = status.Id
            };

            _context.Reservations.Add(reservation);

            await _context.SaveChangesAsync(cancellationToken);

            return reservation.Id;
        }
    }
}