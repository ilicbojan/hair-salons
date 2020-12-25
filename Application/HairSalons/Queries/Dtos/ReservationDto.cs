using System;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.HairSalons.Queries.Dtos
{
    public class ReservationDto : IMapFrom<Reservation>
    {
        public int Id { get; set; }
        public UserDto User { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public DateTime Date { get; set; }
        public int Price { get; set; }
        public ReservationStatusDto Status { get; set; }
    }
}