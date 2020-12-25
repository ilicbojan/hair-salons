using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Services.Commands.CreateService
{
    public class CreateServiceCommand : IRequest<int>
    {
        public string Name { get; set; }
        public int Price { get; set; }
        public int HairSalonId { get; set; }
    }

    public class CreateServiceCommandHandler : IRequestHandler<CreateServiceCommand, int>
    {
        private readonly IAppDbContext _context;

        public CreateServiceCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateServiceCommand request, CancellationToken cancellationToken)
        {
            var service = new Service
            {
                Name = request.Name,
                Price = request.Price,
                HairSalonId = request.HairSalonId
            };

            _context.Services.Add(service);

            await _context.SaveChangesAsync(cancellationToken);

            return service.Id;
        }
    }

}
