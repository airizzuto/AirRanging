using API.Domain.Models;
using API.Domain.Models.Enums;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Persistance.Configurations
{
    public class AircraftConfiguration : IEntityTypeConfiguration<Aircraft>
        {
        public void Configure(EntityTypeBuilder<Aircraft> builder)
        {
            // Aircraft Entity
            builder.ToTable("Aircrafts");

            builder.HasKey(a => a.Id);

            builder.Property(a => a.Id)
                .IsRequired();

            builder.Property(a => a.IcaoId)
                .IsRequired()
                .HasMaxLength(4);

            builder.Property(a => a.Manufacturer)
                .IsRequired();

            builder.Property(a => a.Model)
                .IsRequired();

            builder.Property(a => a.Variant);

            builder.Property(a => a.Registration);

            builder.Property(a => a.AircraftType)
                .IsRequired()
                .HasConversion<string>(); // TODO: check if redundant with JsonStringEnumConverter

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

            // TODO: separate data seeding?
            #region DataSeeding
            builder.HasData(
                new Aircraft
                {
                    Id = -100,
                    IcaoId = "C152",
                    Manufacturer = "Cessna",
                    Model = "152",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineType = EEngineType.Piston,
                    EngineCount = 1,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
                    MaxTakeoffWeight = 1670,
                    CruiseSpeed = 107,
                    FuelCapacity = 26,
                    MaxRange = 415,
                    ServiceCeiling = 14700
                },
                new Aircraft
                {
                    Id = -99,
                    IcaoId = "C152",
                    Manufacturer = "Cessna",
                    Model = "152",
                    Variant = "Long-Range",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineType = EEngineType.Piston,
                    EngineCount = 1,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
                    MaxTakeoffWeight = 1670,
                    CruiseSpeed = 107,
                    FuelCapacity = 38,
                    MaxRange = 691,
                    ServiceCeiling = 14700
                },
                new Aircraft
                {
                    Id = -98,
                    IcaoId = "C172",
                    Manufacturer = "Cessna",
                    Model = "172",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineType = EEngineType.Piston,
                    EngineCount = 1,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
                    MaxTakeoffWeight = 2450,
                    CruiseSpeed = 122,
                    FuelCapacity = 56,
                    MaxRange = 696,
                    ServiceCeiling = 13500
                },
                new Aircraft
                {
                    Id = -97,
                    IcaoId = "A320",
                    Manufacturer = "Airbus",
                    Model = "320",
                    AircraftType = EAircraftType.MultiEngineLand,
                    EngineType = EEngineType.Jet,
                    EngineCount = 2,
                    WeightCategory = EWeightCategory.Large,
                    IcaoWakeCategory = EIcaoWakeCategory.Medium,
                    FuelType = EFuelType.JetA,
                    MaxTakeoffWeight = 172000,
                    CruiseSpeed = 447,
                    FuelCapacity = 6400,
                    MaxRange = 3300,
                    ServiceCeiling = 39100
                },
                new Aircraft
                {
                    Id = -96,
                    IcaoId = "B758",
                    Manufacturer = "Boeing",
                    Model = "737-800",
                    AircraftType = EAircraftType.MultiEngineLand,
                    EngineType = EEngineType.Jet,
                    EngineCount = 2,
                    WeightCategory = EWeightCategory.Large,
                    IcaoWakeCategory = EIcaoWakeCategory.Medium,
                    FuelType = EFuelType.JetA,
                    MaxTakeoffWeight = 144500,
                    CruiseSpeed = 453,
                    FuelCapacity = 6875,
                    MaxRange = 2935,
                    ServiceCeiling = 41000
                }
            );
            #endregion
        }
    }
}