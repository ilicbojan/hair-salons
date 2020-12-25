using System.Collections.Generic;
using Application.Cities.Queries.Dtos;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Cities.Queries.GetCityDetails
{
    public class CityVm : IMapFrom<City>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public CountryDto Country { get; set; }
        public IList<HairSalonDto> HairSalons { get; set; } = new List<HairSalonDto>();
    }
}