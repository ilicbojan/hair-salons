using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Persistence.Configurations
{
    public class ContactConfiguration : IEntityTypeConfiguration<Contact>
    {

        public void Configure(EntityTypeBuilder<Contact> builder)
        {
            builder.Property(c => c.Name)
                .HasMaxLength(30)
                .IsRequired();

            builder.Property(c => c.Email)
                .HasMaxLength(30)
                .IsRequired();

            builder.Property(c => c.PhoneNumber)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(c => c.Package)
                .HasMaxLength(20)
                .IsRequired();

            builder.Property(c => c.Message)
                .HasMaxLength(300);
        }
    }
}
