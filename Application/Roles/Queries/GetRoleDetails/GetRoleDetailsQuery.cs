using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using AutoMapper;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Roles.Queries.GetRoleDetails
{
    public class GetRoleDetailsQuery : IRequest<RoleVm>
    {
        public string Id { get; set; }
    }

    public class GetRoleDetailsQueryHandler : IRequestHandler<GetRoleDetailsQuery, RoleVm>
    {
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly UserManager<AppUser> _userManager;
        private readonly IMapper _mapper;
        public GetRoleDetailsQueryHandler(RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager, IMapper mapper)
        {
            _mapper = mapper;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<RoleVm> Handle(GetRoleDetailsQuery request, CancellationToken cancellationToken)
        {
            var role = await _roleManager.FindByIdAsync(request.Id);

            if (role == null)
            {
                throw new NotFoundException(nameof(IdentityRole), request.Id);
            }

            var usersInRole = await _userManager.GetUsersInRoleAsync(role.Name);

            var users = new List<UserDto>();

            foreach (var user in usersInRole)
            {
                users.Add(new UserDto { Id = user.Id, Username = user.UserName });
            }

            return new RoleVm
            {
                Id = role.Id,
                Name = role.Name,
                Users = users
            };
        }
    }
}