using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Countries.Commands.CreateCountry
{
  public class CreateCountryCommandValidator : AbstractValidator<CreateCountryCommand>
  {
    private readonly IAppDbContext _context;

    public CreateCountryCommandValidator(IAppDbContext context)
    {
      _context = context;

      RuleFor(c => c.Name)
        .NotEmpty().WithMessage("Naziv je obavezan")
        .MaximumLength(200).WithMessage("Naziv ne sme biti duzi od 200 karaktera")
        .MustAsync(BeUniqueName).WithMessage("Izabrani naziv vec postoji");
    }

    public async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
    {
      return await _context.Countries.AllAsync(c => c.Name != name);
    }
  }
}