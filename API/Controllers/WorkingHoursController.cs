using System.Threading.Tasks;
using Application.WorkingHours.Commands.CreateWorkingHours;
using Application.WorkingHours.Commands.UpdateWorkingHours;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles = RolesEnum.Admin + "," + RolesEnum.Client)]
    [Route("api/hair-salons")]
    public class WorkingHoursController : ApiController
    {
        [HttpPost("{id}/working-hours")]
        public async Task<ActionResult<Unit>> Create(int id, CreateWorkingHoursCommand command)
        {
            command.HairSalonId = id;

            return await Mediator.Send(command);
        }

        [HttpPut("{id}/working-hours")]
        public async Task<ActionResult<Unit>> Update(int id, UpdateWorkingHoursCommand command)
        {
            command.HairSalonId = id;

            return await Mediator.Send(command);
        }
    }
}