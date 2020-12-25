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

namespace Application.Images.Commands.DeleteImage
{
    public class DeleteImageCommand : IRequest
    {
        public string Id { get; set; }
        public int HairSalonId { get; set; }
    }

    public class DeleteImageCommandHandler : IRequestHandler<DeleteImageCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IImageService _imageService;
        private readonly IIdentityService _identityService;

        public DeleteImageCommandHandler(IAppDbContext context, IImageService imageService, IIdentityService identityService)
        {
            _context = context;
            _imageService = imageService;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(DeleteImageCommand request, CancellationToken cancellationToken)
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

            if (image.IsMain)
            {
                throw new Exception("Ne mozete izbrisati glavnu sliku");
            }

            var result = _imageService.DeletePhoto(image.Id);

            if (result == null)
            {
                throw new Exception("Problem prilikom brisanja slike");
            }

            hairSalon.Images.Remove(image);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
