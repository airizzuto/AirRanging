using System;
using System.Linq;
using Entities.Models;
using Entities.Models.Enums;

namespace Entities.Data
{
    public static class DbInitializer
    {
        public static void Initialize(RepositoryContext context)
        {
            // TODO: users

            if (context.Aircrafts.Any())
            {
                return;  // Already initialized
            }

            var aircrafts = new Aircraft[]
            {
                new Aircraft
                {
                    Id = Guid.NewGuid(),
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
                    Id = Guid.NewGuid(),
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
                    Id = Guid.NewGuid(),
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
                    Id = Guid.NewGuid(),
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
                    Id = Guid.NewGuid(),
                    IcaoId = "B738",
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
            };
        
            foreach (var aircraft in aircrafts)
            {
                context.Aircrafts.Add(aircraft);
            }
            context.SaveChanges();

            var users = new ApplicationUser[]
            {
                new ApplicationUser
                {
                    UserName = "jholden",
                    Email = "jamesholden@unnc.mil",
                },

                new ApplicationUser
                {
                    UserName = "lskywalker",
                    Email = "lukeskywalker@redsquadron.mil"
                },
            };

            foreach (var user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();

        }
    }
}