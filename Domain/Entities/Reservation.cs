using System;

namespace Domain.Entities
{
    public class Reservation
    {
        public int Id { get; set; }
        public int HairSalonId { get; set; }
        public string UserId { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public DateTime Date { get; set; }
        public DateTime CreatedAt { get; set; }
        public int Price { get; set; }
        public int StatusId { get; set; }

        public virtual HairSalon HairSalon { get; set; }
        public virtual AppUser User { get; set; }
        public virtual ReservationStatus Status { get; set; }
    }
}