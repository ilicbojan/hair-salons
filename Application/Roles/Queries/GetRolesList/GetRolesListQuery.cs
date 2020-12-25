using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Roles.Queries.GetRolesList
{
  public class GetRolesListQuery : IRequest<RolesListVm>
  {
  }
  public class GetRolesListQueryHandler : IRequestHandler<GetRolesListQuery, RolesListVm>
  {
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<AppUser> _userManager;
    public GetRolesListQueryHandler(RoleManager<IdentityRole> roleManager, UserManager<AppUser> userManager)
    {
      _userManager = userManager;
      _roleManager = roleManager;
    }

    public async Task<RolesListVm> Handle(GetRolesListQuery request, CancellationToken cancellationToken)
    {
      var roles = await _roleManager.Roles
          .OrderBy(r => r.Name)
          .ToListAsync();

      var vm = new RolesListVm();

      foreach (var role in roles)
      {
        var usersInRole = await _userManager.GetUsersInRoleAsync(role.Name);

        var users = new List<UserDto>();

        foreach (var user in usersInRole)
        {
          users.Add(new UserDto { Id = user.Id, Username = user.UserName });
        }

        vm.Roles.Add(new RoleDto { Id = role.Id, Name = role.Name, Users = users });
      }

      return vm;
    }
  }
}