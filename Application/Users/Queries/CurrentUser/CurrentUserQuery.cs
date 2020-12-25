using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Users.Queries.LoginUser;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users.Queries.CurrentUser
{
    public class CurrentUserQuery : IRequest<UserVm>
    {
    }

    public class CurrentUserQueryHandler : IRequestHandler<CurrentUserQuery, UserVm>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly IJwtGenerator _jwtGenerator;
        private readonly ICurrentUserService _currentUserService;

        public CurrentUserQueryHandler(UserManager<AppUser> userManager,
            IJwtGenerator jwtGenerator,
            ICurrentUserService currentUserService)
        {
            _currentUserService = currentUserService;
            _jwtGenerator = jwtGenerator;
            _userManager = userManager;
        }

        public async Task<UserVm> Handle(CurrentUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(_currentUserService.UserId);

            var roles = await _userManager.GetRolesAsync(user);

            return new UserVm
            {
                Id = user.Id,
                Token = await _jwtGenerator.CreateToken(user),
                Username = user.UserName,
                IsClient = await _userManager.IsInRoleAsync(user, RolesEnum.Client),
                Roles = roles
            };
        }
    }
}