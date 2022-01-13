using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models.Aircrafts;
using Entities.Models.Enums;
using Entities.Models.Pagination;

namespace Tests.Helpers
{
    public class MockAircraftsData
    {
        private readonly List<Aircraft> mockAircrafts;

        public MockAircraftsData()
        {
            mockAircrafts = new List<Aircraft>()
            { 
                new Aircraft {
                    Id = Guid.NewGuid(),
                    IcaoId = "C152",
                    Manufacturer = "Cessna",
                    Model = "152",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineType = EEngineType.Piston,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.AvGas,
                    MTOW = 1670,
                    CruiseSpeed = 107,
                    FuelCapacity = 26,
                    MaxRange = 415,
                    ServiceCeiling = 14700
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
                    MTOW = 144500,
                    CruiseSpeed = 453,
                    FuelCapacity = 6875,
                    MaxRange = 2935,
                    ServiceCeiling = 41000
                },
                new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "B78X",
                    Manufacturer = "Boeing",
                    Model = "787-10",
                    AircraftType = EAircraftType.MultiEngineLand,
                    EngineCount = 2,
                    EngineType = EEngineType.Jet,
                    WeightCategory = EWeightCategory.Heavy,
                    IcaoWakeCategory = EIcaoWakeCategory.Heavy,
                    FuelType = EFuelType.JetA,
                    MTOW = 560000,
                    CruiseSpeed = 488,
                    FuelCapacity = 223673,
                    MaxRange = 6430,
                    ServiceCeiling = 41100
                },
                new Aircraft
                {
                    Id = Guid.NewGuid(),
                    IcaoId = "P47",
                    Manufacturer = "Republic",
                    Model = "P-47D Thunderbolt",
                    Variant = "Combat",
                    AircraftType = EAircraftType.SingleEngineLand,
                    EngineCount = 1,
                    EngineType = EEngineType.Piston,
                    WeightCategory = EWeightCategory.Small,
                    IcaoWakeCategory = EIcaoWakeCategory.Light,
                    FuelType = EFuelType.Unknown,
                    MTOW = 17500,
                    CruiseSpeed = 304,
                    FuelCapacity = 370,
                    MaxRange = 391,
                    ServiceCeiling = 42000
                }
            };
        }

        public async Task<PagedList<Aircraft>> RetrieveAllAircraftsAsync(AircraftParameters parameters)
        {
            var aircrafts = mockAircrafts.ToList();
            var result = new PagedList<Aircraft>(
                aircrafts, aircrafts.Count,parameters.PageNumber, parameters.PageSize
            );
            return await Task.FromResult(result);
        }

        public async Task<PagedList<Aircraft>> RetrieveAircraftsQuantityAsync(int num, AircraftParameters parameters)
        {
            if (num > 0)
            {
                var aircrafts = mockAircrafts.Take(num).ToList();
                return new PagedList<Aircraft>(aircrafts, aircrafts.Count, parameters.PageNumber, parameters.PageSize);
            }

            var emptyDb = new List<Aircraft> { };
            var result = new PagedList<Aircraft>(emptyDb, emptyDb.Count, 1, num);

            return await Task.FromResult(result);
        }
    }
}