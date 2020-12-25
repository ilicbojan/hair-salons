using System.Collections.Generic;
using Application.Common.Mappings;
using Application.Countries.Queries.Dtos;
using AutoMapper;
using Domain.Entities;

namespace Application.Countries.Queries.GetCountryDetails
{
    public class CountryVm : IMapFrom<Country>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IList<CityDto> Cities { get; set; } = new List<CityDto>();
        public int CitiesCount { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Country, CountryVm>()
                .ForMember(d => d.CitiesCount, opt => opt.MapFrom(s => s.Cities.Count));
        }
    }
}