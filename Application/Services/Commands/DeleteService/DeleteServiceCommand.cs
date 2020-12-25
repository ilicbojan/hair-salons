using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.Commands.DeleteService
{
    public class DeleteServiceCommand : IRequest
    {
        public int Id { get; set; }
    }

    public class DeleteServiceCommandHandler : IRequestHandler<DeleteServiceCommand>
    {
        private readonly IAppDbContext _context;

        public DeleteServiceCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteServiceCommand request, CancellationToken cancellationToken)
        {
            var service = await _context.Services.FindAsync(request.Id);

            if (service == null)
            {
                throw new NotFoundException(nameof(Service), request.Id);
            }

            _context.Services.Remove(service);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
