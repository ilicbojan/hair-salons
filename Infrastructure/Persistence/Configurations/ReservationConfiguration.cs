using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
    public class ReservationConfiguration : IEntityTypeConfiguration<Reservation>
    {
        public void Configure(EntityTypeBuilder<Reservation> builder)
        {
            builder.Property(r => r.Id)
                    .ValueGeneratedOnAdd();

            builder.Property(r => r.StartTime)
                  .IsRequired();

            builder.Property(r => r.EndTime)
                  .IsRequired();

            builder.Property(r => r.Date)
                  .IsRequired();

            builder.Property(r => r.Price)
                    .IsRequired();

            builder.Property(r => r.StatusId)
                    .IsRequired();


            builder.HasKey(r => new { r.Id, r.HairSalonId, r.UserId });

            builder.HasOne(r => r.User)
                  .WithMany(u => u.Reservations)
                  .HasForeignKey(r => r.UserId);

            builder.HasOne(r => r.HairSalon)
                  .WithMany(so => so.Reservations)
                  .HasForeignKey(r => r.HairSalonId);
        }
    }
}