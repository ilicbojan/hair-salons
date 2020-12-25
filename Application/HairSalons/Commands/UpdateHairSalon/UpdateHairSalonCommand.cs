using System;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.HairSalons.Commands.UpdateHairSalon
{
    public class UpdateHairSalonCommand : IRequest
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public bool IsPayed { get; set; }
        public bool IsPremium { get; set; }
        public int CityId { get; set; }
    }

    public class UpdateHairSalonCommandHandler : IRequestHandler<UpdateHairSalonCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public UpdateHairSalonCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(UpdateHairSalonCommand request, CancellationToken cancellationToken)
        {
            var hairSalon = await _context.HairSalons.FindAsync(request.Id);

            if (hairSalon == null)
            {
                throw new NotFoundException(nameof(HairSalon), request.Id);
            }

            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(hairSalon);
            var isAdmin = await _identityService.CheckIfUserIsAdmin();

            if (!isOwner && !isAdmin)
            {
                throw new Exception("Bad client");
            }

            hairSalon.Email = request.Email;
            hairSalon.Name = request.Name;
            hairSalon.Address = request.Address;
            hairSalon.Phone = request.Phone;
            hairSalon.Description = request.Description;
            hairSalon.IsPayed = request.IsPayed;
            hairSalon.IsPremium = request.IsPremium;
            hairSalon.CityId = request.CityId;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}