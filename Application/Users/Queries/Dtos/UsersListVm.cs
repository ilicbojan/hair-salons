using System.Collections.Generic;

namespace Application.Users.Queries.Dtos
{
  public class UsersListVm
  {
    public IList<UserDto> Users { get; set; }
    public int UsersCount { get; set; }
  }
}