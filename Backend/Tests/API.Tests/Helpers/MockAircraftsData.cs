using System.Collections.Generic;
using API.Domain.Models;
using API.Domain.Models.Enums;

namespace API.Tests.Helpers
{
    public class MockAircraftsData
    {
        public Aircraft mockAircraft0 = new Aircraft 
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
        };
        public Aircraft mockAircraft1 = new Aircraft
        {
            Id = 1,
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
        };


        public List<Aircraft> GetAircrafts(int num)
        {
            var aircrafts = new List<Aircraft>();
            if (num > 0)
            {
                aircrafts.Add(mockAircraft0);
            }

            return aircrafts;
        }
    }
}