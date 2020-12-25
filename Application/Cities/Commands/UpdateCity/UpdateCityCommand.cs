using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Cities.Commands.UpdateCity
{
    public class UpdateCityCommand : IRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CountryId { get; set; }
    }

    public class UpdateCityCommandHandler : IRequestHandler<UpdateCityCommand>
    {
        private readonly IAppDbContext _context;

        public UpdateCityCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateCityCommand request, CancellationToken cancellationToken)
        {
            var city = await _context.Cities.FindAsync(request.Id);

            if (city == null)
            {
                throw new NotFoundException(nameof(City), request.Id);
            }

            city.Name = request.Name;
            city.CountryId = request.CountryId;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}