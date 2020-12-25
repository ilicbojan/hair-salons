using System.Collections.Generic;

namespace Domain.Entities
{
    public class HairSalon
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public bool IsPayed { get; set; }
        public bool IsPremium { get; set; }
        public int CityId { get; set; }

        public virtual ICollection<WorkingHour> WorkingHours { get; set; }
        public virtual ICollection<Service> Services { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<Favourite> Favourites { get; set; }
        public virtual ICollection<Image> Images { get; set; }

        public virtual City City { get; set; }
    }
}