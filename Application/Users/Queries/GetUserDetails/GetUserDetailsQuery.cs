using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Users.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.GetUserDetails
{
  public class GetUserDetailsQuery : IRequest<UserDto>
  {
    public string Id { get; set; }
  }

  public class GetUserDetailsQueryHandler : IRequestHandler<GetUserDetailsQuery, UserDto>
  {
    private readonly IMapper _mapper;
    private readonly UserManager<AppUser> _userManager;
    public GetUserDetailsQueryHandler(UserManager<AppUser> userManager, IMapper mapper)
    {
      _userManager = userManager;
      _mapper = mapper;
    }

    public async Task<UserDto> Handle(GetUserDetailsQuery request, CancellationToken cancellationToken)
    {
      var vm = await _userManager.Users
            .Where(u => u.Id == request.Id)
            .ProjectTo<UserDto>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(cancellationToken);

      var user = await _userManager.FindByIdAsync(request.Id);
      vm.Roles = await _userManager.GetRolesAsync(user);

      return vm;
    }
  }
}