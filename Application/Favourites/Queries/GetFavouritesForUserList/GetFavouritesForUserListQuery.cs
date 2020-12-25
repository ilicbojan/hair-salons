using Application.Cities.Queries.Dtos;
using Application.Common.Interfaces;
using Application.Favourites.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Favourites.Queries.GetFavouritesForUserList
{
    public class GetFavouritesForUserListQuery : IRequest<FavouritesListVm>
    {

    }

    public class GetFavouritesForUserListQueryHandler : IRequestHandler<GetFavouritesForUserListQuery, FavouritesListVm>
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;

        public GetFavouritesForUserListQueryHandler(IAppDbContext context, ICurrentUserService currentUserService, IMapper mapper)
        {
            _context = context;
            _currentUserService = currentUserService;
            _mapper = mapper;
        }

        public async Task<FavouritesListVm> Handle(GetFavouritesForUserListQuery request, CancellationToken cancellationToken)
        {
            var userId = _currentUserService.UserId;

            var vm = new FavouritesListVm();

            vm.Favourites = await _context.Favourites
                .Where(f => f.UserId == userId)
                .ProjectTo<FavouriteDto>(_mapper.ConfigurationProvider)
                .OrderBy(f => f.Id)
                .ToListAsync(cancellationToken);

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == _currentUserService.UserId);

            if (user != null)
            {
                foreach (var item in vm.Favourites)
                {
                    if (user.Favourites.Any(x => x.HairSalonId == item.HairSalon.Id))
                    {
                        item.HairSalon.IsFavourite = true;
                    }
                }
            }

            return vm;
        }
    }
}
