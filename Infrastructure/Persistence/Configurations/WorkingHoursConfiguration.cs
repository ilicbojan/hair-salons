using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Persistence.Configurations
{
  public class WorkingHoursConfiguration : IEntityTypeConfiguration<WorkingHour>
  {
    public void Configure(EntityTypeBuilder<WorkingHour> builder)
    {
      builder.Property(wh => wh.Day)
          .HasMaxLength(1)
          .IsRequired();

      builder.Property(wh => wh.OpenTime).IsRequired();

      builder.Property(wh => wh.CloseTime).IsRequired();

      builder.Property(wh => wh.HairSalonId).IsRequired();
    }
  }
}