using System.Collections.Generic;
using Application.Common.Mappings;
using Microsoft.AspNetCore.Identity;

namespace Application.Roles.Queries.GetRolesList
{
    public class RoleDto : IMapFrom<IdentityRole>
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IList<UserDto> Users { get; set; } = new List<UserDto>();
    }
}