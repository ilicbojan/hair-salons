using System.Collections.Generic;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Countries.Queries.Dtos
{
    public class CityDto : IMapFrom<City>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        //public IList<HairSalonDto> HairSalons { get; set; }
    }
}