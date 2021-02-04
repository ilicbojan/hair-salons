using System.Threading.Tasks;
using Application.Reservations.Commands.ApproveReservation;
using Application.Reservations.Commands.CreateReservation;
using Application.Reservations.Commands.DeleteReservation;
using Application.Reservations.Queries.Dtos;
using Application.Reservations.Queries.GetFreeTerms;
using Application.Reservations.Queries.GetReservationsList;
using Application.Reservations.Queries.GetReservationStatusesList;
using Application.Reservations.Queries.GetTermsList;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ReservationsController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<ReservationsListVm>> GetAll(string? status, int? limit, int? offset)
        {
            return await Mediator.Send(new GetReservationsListQuery(status, limit, offset));
        }

        [HttpPost]
        public async Task<ActionResult<int>> Create(CreateReservationCommand command)
        {
            return await Mediator.Send(command);
        }

        [Authorize(Roles = RolesEnum.Admin + ", " + RolesEnum.Client)]
        [HttpPut("{id}")]
        public async Task<ActionResult<Unit>> Approve(int id)
        {
            return await Mediator.Send(new ApproveReservationCommand { Id = id });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<Unit>> Delete(int id)
        {
            return await Mediator.Send(new DeleteReservationCommand { Id = id });
        }

        [AllowAnonymous]
        [Route("/api/hair-salons/{id}/free-terms")]
        [HttpGet]
        public async Task<ActionResult<FreeTermsListVm>> GetFreeTerms(int id)
        {
            return await Mediator.Send(new GetFreeTermsQuery { Id = id });
        }

        [AllowAnonymous]
        [Route("/api/hair-salons/{id}/terms")]
        [HttpGet]
        public async Task<ActionResult<TermsListVm>> GetTerms(int id)
        {
            return await Mediator.Send(new GetTermsListQuery { Id = id });
        }

        [HttpGet("statuses")]
        public async Task<ActionResult<ReservationStatusesListVm>> GetStatuses()
        {
            return await Mediator.Send(new GetReservationStatusesListQuery());
        }
    }
}