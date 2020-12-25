using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.UpdateUser
{
  public class UpdateUserCommandValidator : AbstractValidator<UpdateUserCommand>
  {
    private readonly IAppDbContext _context;
    public UpdateUserCommandValidator(IAppDbContext context)
    {
      _context = context;

      //RuleFor(u => u.Email)
      //    .NotEmpty().WithMessage("Email je obavezan")
      //    .EmailAddress().WithMessage("Email nije u ispravnom formatu")
      //    .MustAsync(BeUniqueEmail).WithMessage("Email vec postoji");

      RuleFor(u => u.Username)
          .NotEmpty().WithMessage("Username je obavezan")
          .MustAsync(BeUniqueUsername).WithMessage("Username vec postoji");
    }

    //public async Task<bool> BeUniqueEmail(UpdateUserCommand model, string email, CancellationToken cancellationToken)
    //{
    //  return await _context.Users
    //        .Where(u => u.Id != model.Id)
    //        .AllAsync(u => u.Email != email);
    //}

    public async Task<bool> BeUniqueUsername(UpdateUserCommand model, string username, CancellationToken cancellationToken)
    {
      return await _context.Users
            .Where(u => u.Id != model.Id)
            .AllAsync(u => u.UserName != username);
    }
  }
}