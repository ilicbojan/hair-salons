using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Users.Queries.LoginAdminUser
{
  public class LoginAdminUserQueryValidator : AbstractValidator<LoginAdminUserQuery>
  {
    private readonly UserManager<AppUser> _userManager;
    public LoginAdminUserQueryValidator(UserManager<AppUser> userManager)
    {
      _userManager = userManager;

      RuleFor(v => v.Email)
        .NotEmpty().WithMessage("Email je obavezan")
        .EmailAddress().WithMessage("Email nije u ispravnom formatu")
        .MustAsync(EmailExists).WithMessage("Izabrani email ne postoji, registrujte se");

      RuleFor(v => v.Password)
          .NotEmpty().WithMessage("Password je obavezan");
    }

    public async Task<bool> EmailExists(string email, CancellationToken cancellationToken)
    {
      return await _userManager.Users.AnyAsync(u => u.Email == email);
    }
  }
}