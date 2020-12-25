using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Roles.Commands.UpdateRole
{
    public class UpdateRoleCommand : IRequest
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

    public class UpdateRoleCommandHandler : IRequestHandler<UpdateRoleCommand>
    {
        private readonly IIdentityService _identityService;

        public UpdateRoleCommandHandler(IIdentityService identityService)
        {
            _identityService = identityService;
        }

        public async Task<Unit> Handle(UpdateRoleCommand request, CancellationToken cancellationToken)
        {
            var result = await _identityService.UpdateRoleAsync(request.Id, request.Name);

            if (result.Succeeded)
            {
                return Unit.Value;
            }

            throw new Exception("Problem updating role.");
        }
    }
}