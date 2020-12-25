using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Countries.Commands.CreateCountry
{
    public class CreateCountryCommand : IRequest<int>
    {
        public string Name { get; set; }
    }

    public class CreateCountryCommandHandler : IRequestHandler<CreateCountryCommand, int>
    {
        private readonly IAppDbContext _context;

        public CreateCountryCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateCountryCommand request, CancellationToken cancellationToken)
        {
            var country = new Country { Name = request.Name };

            _context.Countries.Add(country);

            await _context.SaveChangesAsync(cancellationToken);

            return country.Id;
        }
    }
}