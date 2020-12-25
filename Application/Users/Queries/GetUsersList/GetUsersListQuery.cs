using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Users.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.GetUsersList
{
    public class GetUsersListQuery : IRequest<UsersListVm>
    {

    }

    public class GetUsersListQueryHandler : IRequestHandler<GetUsersListQuery, UsersListVm>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public GetUsersListQueryHandler(UserManager<AppUser> userManager, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
        }

        public async Task<UsersListVm> Handle(GetUsersListQuery request, CancellationToken cancellationToken)
        {
            var vm = new UsersListVm();

            vm.Users = await _userManager.Users
                  .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
                  .OrderBy(u => u.Username)
                  .ToListAsync(cancellationToken);

            foreach (var user in vm.Users)
            {
                var appUser = await _userManager.FindByIdAsync(user.Id);
                user.Roles = await _userManager.GetRolesAsync(appUser);
            }

            vm.UsersCount = vm.Users.Count;

            return vm;
        }
    }
}