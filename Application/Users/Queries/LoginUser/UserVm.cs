using System.Collections.Generic;

namespace Application.Users.Queries.LoginUser
{
    public class UserVm
    {
        public string Token { get; set; }
        public string Id { get; set; }
        public string Username { get; set; }
        public string PhoneNumber { get; set; }
        public bool IsVerified { get; set; }
        public bool IsClient { get; set; }
        public IList<string> Roles { get; set; }
    }
}