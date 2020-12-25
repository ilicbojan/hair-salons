using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using FluentValidation;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Roles.Commands.UpdateRole
{
  public class UpdateRoleCommandValidator : AbstractValidator<UpdateRoleCommand>
  {
    private readonly RoleManager<IdentityRole> _roleManager;
    public UpdateRoleCommandValidator(RoleManager<IdentityRole> roleManager)
    {
      _roleManager = roleManager;

      RuleFor(v => v.Name)
          .NotEmpty().WithMessage("Naziv je obavezan")
          .MaximumLength(30).WithMessage("Naziv ne sme biti duzi od 30 karaktera")
          .MustAsync(BeUniqueName).WithMessage("Izabrani naziv vec postoji");
    }

    public async Task<bool> BeUniqueName(UpdateRoleCommand model, string name, CancellationToken cancellationToken)
    {
      return await _roleManager.Roles
          .Where(r => r.Id != model.Id)
          .AllAsync(r => r.Name != name);
    }
  }
}