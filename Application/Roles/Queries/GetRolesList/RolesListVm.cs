using System.Collections.Generic;

namespace Application.Roles.Queries.GetRolesList
{
    public class RolesListVm
    {
        public RolesListVm()
        {
            Roles = new List<RoleDto>();
        }

        public IList<RoleDto> Roles { get; set; }
    }
}