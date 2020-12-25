using Application.Common.Mappings;
using Domain.Entities;

namespace Application.HairSalons.Queries.Dtos
{
    public class CityDto : IMapFrom<City>
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}