using Application.Favourites.Commands.AddHairSalonToFavourites;
using Application.Favourites.Commands.RemoveHairSalonFromFavourites;
using Application.Favourites.Queries.Dtos;
using Application.Favourites.Queries.GetFavouritesForUserList;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Authorize(Roles = RolesEnum.User)]
    public class FavouritesController : ApiController
    {
        [HttpGet]
        public async Task<ActionResult<FavouritesListVm>> GetAllForUser()
        {
            return await Mediator.Send(new GetFavouritesForUserListQuery());
        }

        [Route("/api/hair-salons/{id}/favourites")]
        [HttpPost]
        public async Task<ActionResult<int>> AddHairSalonToFavourites(int id)
        {
            return await Mediator.Send(new AddHairSalonToFavouritesCommand { HairSalonId = id });
        }

        [Route("/api/hair-salons/{id}/favourites")]
        [HttpDelete]
        public async Task<ActionResult<Unit>> RemoveHairSalonFromFavourites(int id)
        {
            return await Mediator.Send(new RemoveHairSalonFromFavouritesCommand { HairSalonId = id });
        }
    }
}