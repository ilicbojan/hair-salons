using System.Threading.Tasks;
using Application.Cities.Commands.DeleteCity;
using Application.Cities.Commands.CreateCity;
using Application.Cities.Commands.UpdateCity;
using Application.Cities.Queries.GetCityDetails;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Application.Cities.Queries.GetCitiesList;
using Domain.Enums;

namespace API.Controllers
{
    [Authorize(Roles = RolesEnum.Admin)]
    public class CitiesController : ApiController
    {
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<CitiesListVm>> GetAll()
        {
            return await Mediator.Send(new GetCitiesListQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CityVm>> Get(int id)
        {
            return await Mediator.Send(new GetCityDetailsQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateCityCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(int id, UpdateCityCommand command)
        {
            command.Id = id;

            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new DeleteCityCommand { Id = id });
        }
    }
}