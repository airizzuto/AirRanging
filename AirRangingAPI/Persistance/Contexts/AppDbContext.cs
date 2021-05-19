using API.Domain.Models;
using API.Domain.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace API.Persistance.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Aircraft> Aircrafts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            base.OnModelCreating(builder);

            // Aircraft Entity
            builder.Entity<Aircraft>().ToTable("Aircrafts");
            builder.Entity<Aircraft>().HasKey(a => a.Id);
            builder.Entity<Aircraft>().Property(a => a.Id).IsRequired();
            builder.Entity<Aircraft>().Property(a => a.IcaoId).IsRequired().HasMaxLength(4);
            builder.Entity<Aircraft>().Property(a => a.Manufacturer).IsRequired();
            builder.Entity<Aircraft>().Property(a => a.Model).IsRequired();
            builder.Entity<Aircraft>().Property(a => a.Variant);
            builder.Entity<Aircraft>().Property(a => a.AircraftType).IsRequired();
            builder.Entity<Aircraft>().Property(a => a.EngineType).IsRequired();
            builder.Entity<Aircraft>().Property(a => a.WeightCategory).IsRequired();
            builder.Entity<Aircraft>().Property(a => a.IcaoWakeCategory).IsRequired();
            builder.Entity<Aircraft>().Property(a => a.FuelType).IsRequired();
            builder.Entity<Aircraft>().Property(a => a.MTOW);
            builder.Entity<Aircraft>().Property(a => a.CruiseSpeed);
            builder.Entity<Aircraft>().Property(a => a.FuelCapacity).IsRequired();
            builder.Entity<Aircraft>().Property(a => a.MaxRange).IsRequired();
            builder.Entity<Aircraft>().Property(a => a.ServiceCeiling);

            builder.Entity<Aircraft>().HasData(
                new Aircraft
                {
                    Id = -100,
                    IcaoId = "C152",
                    Manufacturer = "Cessna",
                    Model = "152",
                    AircraftType = EAircraftType.FixedWing,
                    EngineType = EEngineType.Piston,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
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
                    AircraftType = EAircraftType.FixedWing,
                    EngineType = EEngineType.Piston,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
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
                    AircraftType = EAircraftType.FixedWing,
                    EngineType = EEngineType.Piston,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
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
                    AircraftType = EAircraftType.FixedWing,
                    EngineType = EEngineType.Jet,
                    WeightCategory = EWeightCategory.Large,
                    IcaoWakeCategory = EIcaoWakeCategory.Medium,
                    FuelType = EFuelType.JetA,
                    MTOW = 172000,
                    CruiseSpeed = 447,
                    FuelCapacity = 6400,
                    MaxRange = 3300,
                    ServiceCeiling = 39100
                }
            );

            // TODO: User Entity
        }
    }
}
