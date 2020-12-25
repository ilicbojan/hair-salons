using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users.Queries.LoginUser
{
    public class LoginUserQuery : IRequest<UserVm>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, UserVm>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;
        public LoginUserQueryHandler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
        {
            _jwtGenerator = jwtGenerator;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<UserVm> Handle(LoginUserQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByEmailAsync(request.Email);

            if (user == null)
            {
                throw new NotFoundException(nameof(AppUser), request.Email);
            }

            var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

            if (result.Succeeded)
            {
                var roles = await _userManager.GetRolesAsync(user);

                return new UserVm
                {
                    Id = user.Id,
                    Token = await _jwtGenerator.CreateToken(user),
                    Username = user.UserName,
                    PhoneNumber = user.PhoneNumber,
                    IsVerified = user.IsVerified,
                    IsClient = await _userManager.IsInRoleAsync(user, RolesEnum.Client),
                    Roles = roles
                };
            }

            throw new Exception("Niste uneli ispravan password");
        }
    }
}