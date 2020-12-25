using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Favourites.Commands.AddHairSalonToFavourites
{
    public class AddHairSalonToFavouritesCommand : IRequest<int>
    {
        public int HairSalonId { get; set; }
    }

    public class AddHairSalonToFavouritesCommandHandler : IRequestHandler<AddHairSalonToFavouritesCommand, int>
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public AddHairSalonToFavouritesCommandHandler(IAppDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<int> Handle(AddHairSalonToFavouritesCommand request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            var existing = await _context.Favourites.FindAsync(userId, request.HairSalonId);

            if (existing != null)
            {
                throw new Exception("Frizerski salon je vec u omiljenim");
            }

            var hairSalon = await _context.HairSalons.FindAsync(request.HairSalonId);

            if (hairSalon == null)
            {
                throw new NotFoundException(nameof(HairSalon), request.HairSalonId);
            }

            Favourite favourite = new Favourite
            {
                HairSalonId = hairSalon.Id,
                UserId = userId
            };

            _context.Favourites.Add(favourite);

            await _context.SaveChangesAsync(cancellationToken);

            return favourite.Id;
        }
    }
}
