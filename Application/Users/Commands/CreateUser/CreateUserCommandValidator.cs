using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Commands.CreateUser
{
  public class CreateUserCommandValidator : AbstractValidator<CreateUserCommand>
  {
    private readonly IAppDbContext _context;
    public CreateUserCommandValidator(IAppDbContext context)
    {
      _context = context;

      RuleFor(u => u.Email)
          .NotEmpty().WithMessage("Email je obavezan")
          .EmailAddress().WithMessage("Email nije u ispravnom formatu")
          .MustAsync(BeUniqueEmail).WithMessage("Email vec postoji");

      RuleFor(u => u.Username)
          .NotEmpty().WithMessage("Username je obavezan")
          .MustAsync(BeUniqueUsername).WithMessage("Username vec postoji");

      RuleFor(u => u.Password)
          .NotEmpty().WithMessage("Password je obavezan")
          .MinimumLength(6).WithMessage("Password mora da bude duzi od 6 karaktera");
    }

    public async Task<bool> BeUniqueEmail(string email, CancellationToken cancellationToken)
    {
      return await _context.Users.AllAsync(u => u.Email != email);
    }

    public async Task<bool> BeUniqueUsername(string username, CancellationToken cancellationToken)
    {
      return await _context.Users.AllAsync(u => u.UserName != username);
    }
  }
}