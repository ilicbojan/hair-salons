using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users.Commands.DeleteUser
{
  public class DeleteUserCommand : IRequest
  {
    public string Id { get; set; }
  }

  public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand>
  {
    private readonly UserManager<AppUser> _userManager;
    public DeleteUserCommandHandler(UserManager<AppUser> userManager)
    {
      _userManager = userManager;
    }

    public async Task<Unit> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
      var user = await _userManager.FindByIdAsync(request.Id);

      if (user == null)
      {
        throw new NotFoundException(nameof(AppUser), request.Id);
      }

      var result = await _userManager.DeleteAsync(user);

      if (result.Succeeded)
      {
        return Unit.Value;
      }

      throw new Exception("Problem deleting user");
    }
  }
}