using System.Collections.Generic;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Users.Queries.Dtos
{
    public class UserDto : IMapFrom<AppUser>
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsVerified { get; set; }
        public IList<string> Roles { get; set; }
    }
}