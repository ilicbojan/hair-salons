using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Reservations.Queries.Dtos
{
    public class TermDto : IMapFrom<Reservation>
    {
        public TimeSpan StartTime { get; set; }
        public int Price { get; set; }
        public string Status { get; set; }
        public bool IsExpired { get; set; }
        public void Mapping(Profile profile)
        {
            profile.CreateMap<Reservation, TermDto>()
                .ForMember(d => d.Status, opt => opt.MapFrom(s => s.Status.Status));
        }
    }
}
