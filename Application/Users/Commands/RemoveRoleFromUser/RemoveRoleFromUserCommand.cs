using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users.Commands.RemoveRoleFromUser
{
    public class RemoveRoleFromUserCommand : IRequest
    {
        public string UserId { get; set; }
        public string RoleId { get; set; }
    }

    public class RemoveRoleFromUserCommandHandler : IRequestHandler<RemoveRoleFromUserCommand>
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public RemoveRoleFromUserCommandHandler(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _roleManager = roleManager;
            _userManager = userManager;
        }

        public async Task<Unit> Handle(RemoveRoleFromUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.UserId);

            if (user == null)
            {
                throw new NotFoundException(nameof(AppUser), request.UserId);
            }

            var role = await _roleManager.FindByIdAsync(request.RoleId);

            if (role == null)
            {
                throw new NotFoundException(nameof(IdentityRole), request.RoleId);
            }

            var result = await _userManager.RemoveFromRoleAsync(user, role.Name);

            if (result.Succeeded)
            {
                return Unit.Value;
            }

            throw new Exception("Problem removing user from role");
        }
    }
}