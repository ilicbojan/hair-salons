using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.HairSalons.Commands.CreateHairSalon
{
    public class CreateHairSalonCommand : IRequest<int>
    {
        public string Email { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public bool IsPayed { get; set; }
        public bool IsPremium { get; set; }
        public int CityId { get; set; }
    }

    public class CreateHairSalonCommandHandler : IRequestHandler<CreateHairSalonCommand, int>
    {
        private readonly IAppDbContext _context;
        public CreateHairSalonCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateHairSalonCommand request, CancellationToken cancellationToken)
        {
            var hairSalon = new HairSalon
            {
                Email = request.Email,
                Name = request.Name,
                Address = request.Address,
                Phone = request.Phone,
                Description = request.Description,
                IsPayed = request.IsPayed,
                IsPremium = request.IsPremium,
                CityId = request.CityId
            };

            _context.HairSalons.Add(hairSalon);

            await _context.SaveChangesAsync(cancellationToken);

            return hairSalon.Id;
        }
    }
}