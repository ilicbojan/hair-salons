using System.Collections.Generic;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Countries.Queries.Dtos
{
    public class CountryDto : IMapFrom<Country>
    {
        public CountryDto()
        {
            Cities = new List<CityDto>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public IList<CityDto> Cities { get; set; } = new List<CityDto>();
        public int CitiesCount { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Country, CountryDto>()
                .ForMember(d => d.CitiesCount, opt => opt.MapFrom(s => s.Cities.Count));
        }
    }
}