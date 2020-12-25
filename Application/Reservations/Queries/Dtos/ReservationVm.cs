using System;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Reservations.Queries.Dtos
{
    public class ReservationVm : IMapFrom<Reservation>
    {
        public int Id { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public DateTime Date { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Price { get; set; }

        public HairSalonDto HairSalon { get; set; }
        public UserDto User { get; set; }
        public ReservationStatusDto Status { get; set; }
    }
}