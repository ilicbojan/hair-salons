using System.Threading.Tasks;
using Application.Reviews.Commands.CreateReview;
using Application.Reviews.Commands.DeleteReview;
using Application.Reviews.Commands.UpdateReview;
using Application.Reviews.Queries.Dtos;
using Application.Reviews.Queries.GetReviewsList;
using Application.Reviews.Queries.GetReviewsListAll;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/hair-salons")]
    public class ReviewsController : ApiController
    {
        [Authorize(Roles = RolesEnum.Admin)]
        [Route("/api/reviews")]
        [HttpGet]
        public async Task<ActionResult<ReviewsListVm>> GetAll()
        {
            return await Mediator.Send(new GetReviewsListAllQuery());
        }

        [HttpGet("{id}/reviews")]
        public async Task<ActionResult<ReviewsListVm>> Get(int id)
        {
            return await Mediator.Send(new GetReviewsListQuery { HairSalonId = id });
        }

        [Authorize(Roles = RolesEnum.User)]
        [HttpPost("{id}/reviews")]
        public async Task<ActionResult<Unit>> Create(int id, CreateReviewCommand command)
        {
            command.HairSalonId = id;

            return await Mediator.Send(command);
        }

        [Authorize(Roles = RolesEnum.User)]
        [HttpPut("{id}/reviews")]
        public async Task<ActionResult<Unit>> Update(int id, UpdateReviewCommand command)
        {
            command.HairSalonId = id;

            return await Mediator.Send(command);
        }

        [Authorize(Roles = RolesEnum.User + "," + RolesEnum.Admin)]
        [HttpDelete("{hairSalonId}/reviews/{userId}")]
        public async Task<ActionResult<Unit>> Delete(int hairSalonId, string userId)
        {
            return await Mediator.Send(new DeleteReviewCommand { HairSalonId = hairSalonId, UserId = userId });
        }
    }
}