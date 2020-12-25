using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.HairSalons.Commands.DeleteHairSalon
{
    public class DeleteHairSalonCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteHairSalonCommandHandler : IRequestHandler<DeleteHairSalonCommand>
    {
        private readonly IAppDbContext _context;
        public DeleteHairSalonCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteHairSalonCommand request, CancellationToken cancellationToken)
        {
            var hairSalon = await _context.HairSalons.FindAsync(request.Id);

            if (hairSalon == null)
            {
                throw new NotFoundException(nameof(HairSalon), request.Id);
            }

            _context.HairSalons.Remove(hairSalon);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}