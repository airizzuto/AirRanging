using System.Collections.Generic;
using API.Domain.Models;
using API.Domain.Models.Enums;

namespace API.Tests.Helpers
{
    public class MockAircraftsData
    {
        public List<Aircraft> GetAircrafts(int num)
        {
            var aircrafts = new List<Aircraft>();
            if (num > 0)
            {
                aircrafts.Add(new Aircraft
                {
                    Id = 0,
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
                });
            }

            return aircrafts;
        }
    }
}