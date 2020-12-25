using System.Collections.Generic;
using Application.HairSalons.Queries.Dtos;

namespace Application.HairSalons.Queries.GetHairSalonsList
{
    public class HairSalonsListVm
    {
        public IList<HairSalonDto> HairSalons { get; set; } = new List<HairSalonDto>();
        public int HairSalonsCount { get; set; }
    }
}