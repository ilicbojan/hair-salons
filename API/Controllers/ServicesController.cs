using Application.Services.Commands.CreateService;
using Application.Services.Commands.DeleteService;
using Application.Services.Commands.UpdateService;
using Application.Services.Queries.Dtos;
using Application.Services.Queries.GetServices;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class ServicesController : ApiController
    {
        [Route("/api/hair-salons/{id}/services")]
        [HttpGet]
        public async Task<ActionResult<ServicesVm>> GetAll(int id)
        {
            return await Mediator.Send(new GetServicesQuery { HairSalonId = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateServiceCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(int id, UpdateServiceCommand command)
        {
            command.Id = id;

            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new DeleteServiceCommand { Id = id });
        }
    }
}
