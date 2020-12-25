using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Users.Queries.LoginUser;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users.Commands.RegisterUser
{
    public class RegisterUserCommand : IRequest<UserVm>
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
    }

    public class RegisterUserCommandHandler : IRequestHandler<RegisterUserCommand, UserVm>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly IJwtGenerator _jwtGenerator;

        public RegisterUserCommandHandler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
        {
            _jwtGenerator = jwtGenerator;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        public async Task<UserVm> Handle(RegisterUserCommand request, CancellationToken cancellationToken)
        {
            var user = new AppUser
            {
                Email = request.Email,
                UserName = request.Username,
                PhoneNumber = request.PhoneNumber,
                IsVerified = false
            };

            var result = await _userManager.CreateAsync(user, request.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(user, RolesEnum.User);

                var loginResult = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

                if (loginResult.Succeeded)
                {
                    var roles = await _userManager.GetRolesAsync(user);

                    return new UserVm
                    {
                        Token = await _jwtGenerator.CreateToken(user),
                        Id = user.Id,
                        Username = user.UserName,
                        PhoneNumber = user.PhoneNumber,
                        IsClient = await _userManager.IsInRoleAsync(user, RolesEnum.Client),
                        Roles = roles
                    };
                }
            }

            throw new Exception("Problem creating user");
        }
    }
}