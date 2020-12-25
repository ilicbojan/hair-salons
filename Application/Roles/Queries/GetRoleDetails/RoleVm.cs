using System.Collections.Generic;

namespace Application.Roles.Queries.GetRoleDetails
{
    public class RoleVm
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public IList<UserDto> Users { get; set; } = new List<UserDto>();
    }
}