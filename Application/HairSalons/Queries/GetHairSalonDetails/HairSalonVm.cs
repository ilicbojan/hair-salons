using System.Collections.Generic;
using System.Linq;
using Application.Common.Mappings;
using Application.HairSalons.Queries.Dtos;
using AutoMapper;
using Domain.Entities;

namespace Application.HairSalons.Queries.GetHairSalonDetails
{
    public class HairSalonVm : IMapFrom<HairSalon>
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public bool IsPayed { get; set; }
        public bool IsPremium { get; set; }
        public bool IsFavourite { get; set; }
        public bool IsReviewed { get; set; }
        public CityDto City { get; set; }
        public ImageDto Image { get; set; }
        public IList<ServiceDto> Services { get; set; } = new List<ServiceDto>();
        public IList<WorkingHourDto> WorkingHours { get; set; } = new List<WorkingHourDto>();
        public IList<ReviewDto> Reviews { get; set; } = new List<ReviewDto>();
        public IList<ImageDto> Images { get; set; } = new List<ImageDto>();

        public void Mapping(Profile profile)
        {
            profile.CreateMap<HairSalon, HairSalonVm>()
                .ForMember(d => d.Image, opt => opt.MapFrom(s => s.Images.FirstOrDefault(x => x.IsMain)));
        }
    }
}