using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Images.Commands.SetMainImage
{
    public class SetMainImageCommand : IRequest
    {
        public string Id { get; set; }
        public int HairSalonId { get; set; }
    }

    public class SetMainImageCommandHandler : IRequestHandler<SetMainImageCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public SetMainImageCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(SetMainImageCommand request, CancellationToken cancellationToken)
        {
            var hairSalon = await _context.HairSalons.FindAsync(request.HairSalonId);

            if (hairSalon == null)
            {
                throw new NotFoundException(nameof(HairSalon), request.HairSalonId);
            }

            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(hairSalon);

            if (!isOwner)
            {
                throw new Exception("Bad client");
            }

            var image = hairSalon.Images.FirstOrDefault(i => i.Id == request.Id);

            if (image == null)
            {
                throw new NotFoundException(nameof(Image), request.Id);
            }

            var currentMain = hairSalon.Images.FirstOrDefault(i => i.IsMain);

            currentMain.IsMain = false;
            image.IsMain = true;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
