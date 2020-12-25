using Application.Contacts.Commands.CreateContact;
using Application.Contacts.Queries.GetContactsList;
using Domain.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize(Roles = RolesEnum.Admin)]
    public class ContactsController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<ContactsListVm>> GetAll()
        {
            return await Mediator.Send(new GetContactsListQuery());
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateContactCommand command)
        {
            return await Mediator.Send(command);
        }
    }
}
