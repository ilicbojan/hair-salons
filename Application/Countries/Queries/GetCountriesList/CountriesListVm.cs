using System.Collections.Generic;
using Application.Countries.Queries.Dtos;

namespace Application.Countries.Queries.GetCountriesList
{
    public class CountriesListVm
    {
        public IList<CountryDto> Countries { get; set; } = new List<CountryDto>();
        public int CountriesCount { get; set; }
    }
}