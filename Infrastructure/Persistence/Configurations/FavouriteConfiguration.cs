using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class FavouriteConfiguration : IEntityTypeConfiguration<Favourite>
    {
        public void Configure(EntityTypeBuilder<Favourite> builder)
        {
            builder.Property(r => r.Id)
                    .ValueGeneratedOnAdd();

            builder.HasKey(r => new { r.UserId, r.HairSalonId });

            builder.HasOne(r => r.User)
                  .WithMany(u => u.Favourites)
                  .HasForeignKey(r => r.UserId);

            builder.HasOne(r => r.HairSalon)
                  .WithMany(so => so.Favourites)
                  .HasForeignKey(r => r.HairSalonId);
        }
    }
}