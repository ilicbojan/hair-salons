using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Images.Dtos;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Images.Commands.UploadImage
{
    public class UploadImageCommand : IRequest<ImageVm>
    {
        public IFormFile File{ get; set; }
        public int HairSalonId { get; set; }
    }

    public class UploadImageCommandHandler : IRequestHandler<UploadImageCommand, ImageVm>
    {
        private readonly IAppDbContext _context;
        private readonly IImageService _imageService;
        private readonly IIdentityService _identityService;

        public UploadImageCommandHandler(IAppDbContext context, IImageService imageService, IIdentityService identityService)
        {
            _context = context;
            _imageService = imageService;
            _identityService = identityService;
        }

        public async Task<ImageVm> Handle(UploadImageCommand request, CancellationToken cancellationToken)
        {
            var hairSalon = await _context.HairSalons.FindAsync(request.HairSalonId);

            if (hairSalon == null)
            {
                throw new NotFoundException(nameof(HairSalon), hairSalon.Id);
            }

            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(hairSalon);

            if (!isOwner)
            {
                throw new Exception("Bad client");
            }

            var imageUploadResult = _imageService.AddPhoto(request.File);

            var image = new Image
            {
                Url = imageUploadResult.Url,
                Id = imageUploadResult.PublicId
            };

            if (!hairSalon.Images.Any(x => x.IsMain))
            {
                image.IsMain = true;
            }

            hairSalon.Images.Add(image);

            await _context.SaveChangesAsync(cancellationToken);

            ImageVm vm = new ImageVm
            {
                Id = image.Id,
                Url = image.Url,
                IsMain = image.IsMain,
                HairSalonId = image.HairSalonId,
            };

            return vm;
        }
    }
}
