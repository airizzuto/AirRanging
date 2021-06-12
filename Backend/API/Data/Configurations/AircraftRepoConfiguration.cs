using API.Models;
using API.Models.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations
{
  public class AircraftRepoConfiguration : IEntityTypeConfiguration<Aircraft>
    {
        public void Configure(EntityTypeBuilder<Aircraft> builder)
        {
            builder.ToTable("Aircrafts");

            builder.HasKey(a => a.AircraftID);

            builder.Property(a => a.AircraftID)
                .ValueGeneratedOnAdd();

            builder.Property(a => a.IcaoId)
                .HasMaxLength(4);

            builder.Property(a => a.Manufacturer)
                .IsRequired();

            builder.Property(a => a.Model)
                .IsRequired();

            builder.Property(a => a.Variant);

            builder.Property(a => a.Registration);

            builder.Property(a => a.AircraftType)
                .IsRequired()
                .HasConversion<string>(); // TODO: Test if redundant with JsonStringEnumConverter

            builder.Property(a => a.EngineType)
                .IsRequired()
                .HasConversion<string>();
            
            builder.Property(a => a.EngineCount)
                .IsRequired();

            builder.Property(a => a.WeightCategory)
                .IsRequired()
                .HasConversion<string>();

            builder.Property(a => a.IcaoWakeCategory)
                .IsRequired()
                .HasConversion<string>();

            builder.Property(a => a.FuelType)
                .IsRequired()
                .HasConversion<string>();

            builder.Property(a => a.MaxTakeoffWeight);

            builder.Property(a => a.CruiseSpeed);

            builder.Property(a => a.FuelCapacity)
                .IsRequired();

            builder.Property(a => a.MaxRange)
                .IsRequired();

            builder.Property(a => a.ServiceCeiling);

            builder.Property(a => a.SavesCount)
                .HasDefaultValue(1);

            builder
                .HasOne(a => a.Author)
                .WithMany(u => u.UserAircrafts)
                .HasForeignKey(a => a.AuthorID);
        }
    }
}