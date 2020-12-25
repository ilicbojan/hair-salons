using Application.Images.Commands.DeleteImage;
using Application.Images.Commands.SetMainImage;
using Application.Images.Commands.UploadImage;
using Application.Images.Dtos;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize(Roles = RolesEnum.Admin + "," + RolesEnum.Client)]
    [Route("api/hair-salons")]
    public class ImagesController : ApiController
    {
        [HttpPost("{id}/images")]
        public async Task<ActionResult<ImageVm>> Upload(int id, [FromForm]UploadImageCommand command)
        {
            command.HairSalonId = id;

            return await Mediator.Send(command);
        }

        [HttpDelete("{hairSalonId}/images/{imageId}")]
        public async Task<ActionResult<Unit>> Delete(int hairSalonId, string imageId)
        {
            return await Mediator.Send(new DeleteImageCommand { HairSalonId = hairSalonId, Id = imageId });
        }

        [HttpPost("{hairSalonId}/images/{imageId}/set-main")]
        public async Task<ActionResult<Unit>> SetMain(int hairSalonId, string imageId)
        {
            return await Mediator.Send(new SetMainImageCommand { HairSalonId = hairSalonId, Id = imageId });
        }
    }
}
