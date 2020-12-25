using Application.Common.Mappings;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Favourites.Queries.Dtos
{
    public class FavouriteDto : IMapFrom<Favourite>
    {
        public int Id { get; set; }
        public HairSalonDto HairSalon { get; set; }
    }
}
