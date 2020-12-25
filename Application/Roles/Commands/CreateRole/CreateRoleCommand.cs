using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Roles.Commands.CreateRole
{
    public class CreateRoleCommand : IRequest<string>
    {
        public string Name { get; set; }
    }

    public class CreateRoleCommandHandler : IRequestHandler<CreateRoleCommand, string>
    {
        private readonly IIdentityService _identityService;

        public CreateRoleCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<string> Handle(CreateRoleCommand request, CancellationToken cancellationToken)
        {
            var result = await _identityService.CreateRoleAsync(request.Name);

            if (result.Result.Succeeded)
            {
                return result.RoleId;
            }

            throw new Exception("Problem creating role.");
        }
    }
}