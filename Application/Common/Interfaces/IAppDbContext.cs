using System.Threading;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Application.Common.Interfaces
{
    public interface IAppDbContext
    {
        DbSet<AppUser> Users { get; set; }
        DbSet<Country> Countries { get; set; }
        DbSet<City> Cities { get; set; }
        DbSet<HairSalon> HairSalons { get; set; }
        DbSet<Service> Services { get; set; }
        DbSet<Review> Reviews { get; set; }
        DbSet<WorkingHour> WorkingHours { get; set; }
        DbSet<ReservationStatus> ReservationStatuses { get; set; }
        DbSet<Reservation> Reservations { get; set; }
        DbSet<Favourite> Favourites { get; set; }
        DbSet<Image> Images { get; set; }
        DbSet<Contact> Contacts { get; set; }

        Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    }
}