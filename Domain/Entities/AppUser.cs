using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class AppUser : IdentityUser
    {
        public bool IsVerified { get; set; }

        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Reservation> Reservations { get; set; }
        public virtual ICollection<Favourite> Favourites { get; set; }
    }
}