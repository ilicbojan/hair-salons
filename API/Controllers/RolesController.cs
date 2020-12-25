using System.Threading.Tasks;
using Application.Roles.Commands.CreateRole;
using Application.Roles.Commands.DeleteRole;
using Application.Roles.Commands.UpdateRole;
using Application.Roles.Queries.GetRoleDetails;
using Application.Roles.Queries.GetRolesList;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(Roles = RolesEnum.Admin)]
    public class RolesController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<RolesListVm>> GetAll()
        {
            return await Mediator.Send(new GetRolesListQuery());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<RoleVm>> Get(string id)
        {
            return await Mediator.Send(new GetRoleDetailsQuery { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<string>> Create(CreateRoleCommand command)
        {
            return await Mediator.Send(command);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Update(string id, UpdateRoleCommand command)
        {
            command.Id = id;

            return await Mediator.Send(command);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(string id)
        {
            return await Mediator.Send(new DeleteRoleCommand { Id = id });
        }
    }
}