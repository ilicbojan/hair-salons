using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Roles.Commands.CreateRole
{
  public class CreateRoleCommandValidator : AbstractValidator<CreateRoleCommand>
  {
    private readonly RoleManager<IdentityRole> _roleManager;
    public CreateRoleCommandValidator(RoleManager<IdentityRole> roleManager)
    {
      _roleManager = roleManager;

      RuleFor(v => v.Name)
        .NotEmpty().WithMessage("Naziv je obavezan")
        .MaximumLength(30).WithMessage("Naziv ne sme biti duzi od 30 karaktera")
        .MustAsync(BeUniqueName).WithMessage("Izabrani naziv vec postoji");
    }

    public async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
    {
      return await _roleManager.Roles.AllAsync(r => r.Name != name);
    }
  }
}