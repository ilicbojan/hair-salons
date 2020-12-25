using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Favourites.Commands.RemoveHairSalonFromFavourites
{
    public class RemoveHairSalonFromFavouritesCommand : IRequest
    {
        public int HairSalonId { get; set; }
    }

    public class RemoveHairSalonFromFavouritesCommandHandler : IRequestHandler<RemoveHairSalonFromFavouritesCommand>
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserService _currentUserService;

        public RemoveHairSalonFromFavouritesCommandHandler(IAppDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(RemoveHairSalonFromFavouritesCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Id == _currentUserService.UserId);

            var favourite = await _context.Favourites.SingleOrDefaultAsync(f => f.HairSalonId == request.HairSalonId && f.UserId == user.Id);

            if (favourite == null)
            {
                throw new NotFoundException(nameof(HairSalon), request.HairSalonId);
            }

            _context.Favourites.Remove(favourite);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
