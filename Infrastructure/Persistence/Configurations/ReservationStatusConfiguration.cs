using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class ReservationStatusConfiguration : IEntityTypeConfiguration<ReservationStatus>
  {
    public void Configure(EntityTypeBuilder<ReservationStatus> builder)
    {
      builder.Property(rt => rt.Status)
              .IsRequired()
              .HasMaxLength(50);
    }
  }
}