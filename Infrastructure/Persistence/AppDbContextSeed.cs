using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Enums;
using Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Persistence
{
    public class AppDbContextSeed
    {
        public static async Task SeedAsync(AppDbContext context, UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            if (!roleManager.Roles.Any())
            {
                var roles = new List<IdentityRole>
                {
                  new IdentityRole { Name = "admin"},
                  new IdentityRole { Name = "client"},
                  new IdentityRole { Name = "user"}
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }
            }

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                  new AppUser { Email = "admin@test.com", UserName = "admin" },
                  new AppUser { Email = "client@test.com", UserName = "client" },
                  new AppUser { Email = "user@test.com", UserName = "user" },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "test12");
                }
            }

            if (!context.UserRoles.Any())
            {
                var admin = await userManager.FindByNameAsync("admin");
                await userManager.AddToRoleAsync(admin, "admin");

                var client = await userManager.FindByNameAsync("client");
                await userManager.AddToRoleAsync(client, "client");

                var user = await userManager.FindByNameAsync("user");
                await userManager.AddToRoleAsync(user, "user");
            }

            if (!context.Countries.Any())
            {
                var countries = new List<Country>
                {
                    new Country
                    {
                      Name = "Srbija",
                      Cities = new List<City> { new City { Name = "Beograd" }, new City { Name = "Nis"}, new City { Name = "Novi Sad"}}
                    },
                    new Country { Name = "Hrvatska", Cities = new List<City> { new City { Name = "Zagreb" }} },
                    new Country { Name = "Crna Gora", Cities = new List<City> { new City { Name = "Podgorica" }} }
                };

                await context.Countries.AddRangeAsync(countries);

                await context.SaveChangesAsync();
            }

            if (!context.ReservationStatuses.Any())
            {
                var reservationStatuses = new List<ReservationStatus>
                {
                  new ReservationStatus {Status = Status.Pending},
                  new ReservationStatus {Status = Status.Accepted},
                  new ReservationStatus {Status = Status.Declined}
                };

                await context.ReservationStatuses.AddRangeAsync(reservationStatuses);

                await context.SaveChangesAsync();
            }
        }
    }
}