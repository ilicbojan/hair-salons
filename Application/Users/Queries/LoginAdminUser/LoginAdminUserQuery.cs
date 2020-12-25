using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users.Queries.LoginAdminUser
{
  public class LoginAdminUserQuery : IRequest<AdminUserVm>
  {
    public string Email { get; set; }
    public string Password { get; set; }
  }

  public class LoginAdminUserQueryHandler : IRequestHandler<LoginAdminUserQuery, AdminUserVm>
  {
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IJwtGenerator _jwtGenerator;
    public LoginAdminUserQueryHandler(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager, IJwtGenerator jwtGenerator)
    {
      this._jwtGenerator = jwtGenerator;
      this._signInManager = signInManager;
      this._userManager = userManager;
    }

    public async Task<AdminUserVm> Handle(LoginAdminUserQuery request, CancellationToken cancellationToken)
    {
      var user = await _userManager.FindByEmailAsync(request.Email);

      if (user == null)
      {
        throw new NotFoundException(nameof(AppUser), request.Email);
      }

      var isAdmin = await _userManager.IsInRoleAsync(user, RolesEnum.Admin);

      if (!isAdmin)
      {
        throw new Exception("Morate biti admin");
      }

      var result = await _signInManager.CheckPasswordSignInAsync(user, request.Password, false);

      if (result.Succeeded)
      {

        return new AdminUserVm
        {
          Token = await _jwtGenerator.CreateToken(user),
          Id = user.Id,
          Username = user.UserName,
        };
      }

      throw new Exception("Niste uneli ispravan password");
    }
  }
}