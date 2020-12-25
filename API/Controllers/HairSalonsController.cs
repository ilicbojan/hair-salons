using System.Threading.Tasks;
using Application.HairSalons.Commands.CreateHairSalon;
using Application.HairSalons.Commands.DeleteHairSalon;
using Application.HairSalons.Commands.UpdateHairSalon;
using Application.HairSalons.Queries.GetFeaturedHairSalonsList;
using Application.HairSalons.Queries.GetHairSalonDetails;
using Application.HairSalons.Queries.GetHairSalonsList;
using Application.HairSalons.Queries.GetMyHairSalonDetails;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/hair-salons")]
    public class HairSalonsController : ApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<HairSalonsListVm>> GetAll(int? cityId, string? date, string? time, bool isPremium, bool isPayed)
        {
            return await Mediator.Send(new GetHairSalonsListQuery(cityId, date, time, isPayed));
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<HairSalonVm>> Get(int id)
        {
            return await Mediator.Send(new GetHairSalonDetailsQuery { Id = id });
        }

        [Authorize(Roles = RolesEnum.Client)]
        [HttpGet("owner")]
        public async Task<ActionResult<HairSalonVm>> GetMy()
        {
            return await Mediator.Send(new GetMyHairSalonDetailsQuery());
        }

        [AllowAnonymous]
        [HttpGet("featured")]
        public async Task<ActionResult<HairSalonsListVm>> GetFeatured()
        {
            return await Mediator.Send(new GetFeaturedHairSalonsListQuery());
        }

        [Authorize(Roles = RolesEnum.Admin)]
        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateHairSalonCommand command)
        {
            return await Mediator.Send(command);
        }

        [Authorize(Roles = RolesEnum.Client + "," + RolesEnum.Admin)]
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(int id, UpdateHairSalonCommand command)
        {
            command.Id = id;

            return await Mediator.Send(command);
        }

        [Authorize(Roles = RolesEnum.Admin)]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new DeleteHairSalonCommand { Id = id });
        }
    }
}