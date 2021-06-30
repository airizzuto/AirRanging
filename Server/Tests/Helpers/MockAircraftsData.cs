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
                    MaxTakeoffWeight = 1670,
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
                    MaxTakeoffWeight = 144500,
                    CruiseSpeed = 453,
                    FuelCapacity = 6875,
                    MaxRange = 2935,
                    ServiceCeiling = 41000
                }
            };
        }

        public async Task<PagedList<Aircraft>> RetrieveAllAircraftsAsync(AircraftParameters parameters)
        {
            var aircrafts = mockAircrafts.AsQueryable();
            return await PagedList<Aircraft>.ToPagedList(
                aircrafts, parameters.PageNumber, parameters.PageSize);
        }

        public async Task<PagedList<Aircraft>> RetrieveAircraftsQuantity(int num, AircraftParameters parameters)
        {
            if (num > 0)
            {
                var aircrafts = mockAircrafts.GetRange(0, num).AsQueryable();
                return await PagedList<Aircraft>.ToPagedList(
                    aircrafts, parameters.PageNumber, parameters.PageSize);
            }

            var emptyList = new List<Aircraft> { }.AsQueryable();

            return await PagedList<Aircraft>.ToPagedList( 
                emptyList,
                parameters.PageNumber,
                parameters.PageSize);
        }

        public Aircraft RetrieveAircraftNum(int num)
        {
            return mockAircrafts[num];
        }
    }
}