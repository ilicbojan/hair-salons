using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Cities.Commands.CreateCity
{
    public class CreateCityCommandValidator : AbstractValidator<CreateCityCommand>
    {
        private readonly IAppDbContext _context;

        public CreateCityCommandValidator(IAppDbContext context)
        {
            _context = context;

            RuleFor(c => c.Name)
              .NotEmpty().WithMessage("Naziv je obavezan")
              .MaximumLength(30).WithMessage("Naziv ne sme biti duzi od 30 karaktera")
              .MustAsync(BeUniqueName).WithMessage("Izabrani naziv vec postoji");

            RuleFor(c => c.CountryId)
              .NotEmpty().WithMessage("Drzava je obavezna")
              .MustAsync(CountryExists).WithMessage("Izabrana drzava ne postoji");
        }

        public async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
        {
            return await _context.Cities.AllAsync(c => c.Name != name);
        }

        public async Task<bool> CountryExists(int id, CancellationToken cancellationToken)
        {
            return await _context.Countries.AnyAsync(c => c.Id == id);
        }
    }
}