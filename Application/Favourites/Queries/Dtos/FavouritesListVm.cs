using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Favourites.Queries.Dtos
{
    public class FavouritesListVm
    {
        public IList<FavouriteDto> Favourites { get; set; } = new List<FavouriteDto>();
    }
}
