using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Cities.Commands.DeleteCity
{
    public class DeleteCityCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteCityCommandHandler : IRequestHandler<DeleteCityCommand>
    {
        private readonly IAppDbContext _context;

        public DeleteCityCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteCityCommand request, CancellationToken cancellationToken)
        {
            var city = await _context.Cities.FindAsync(request.Id);

            if (city == null)
            {
                throw new NotFoundException(nameof(City), request.Id);
            }

            _context.Cities.Remove(city);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}