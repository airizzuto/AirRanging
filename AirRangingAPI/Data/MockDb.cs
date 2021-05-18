using System.Collections.Generic;
using AirRangingAPI.Domain.Models;
using AirRangingAPI.Domain.Models.Enums;

namespace AirRangingAPI.Data
{
  public class MockDb : IAirRangingDb
  {
    public Aircraft GetAircraftById(int id)
    {
      return new Aircraft {
        Id=0, IcaoId="C152", Manufacturer="Cessna", Model="152",
        AircraftType=EAircraftType.FixedWing, EngineType=EEngineType.Piston,
        WeightCategory=EWeightCategory.Small, IcaoWakeCategory=EIcaoWakeCategory.Light,
        FuelType=EFuelType.AvGas,
        CruiseSpeed=107, FuelCapacity=26, MaxRange=415, ServiceCeiling=14700
      };
    }

    public IEnumerable<Aircraft> GetAllAircraft()
    {
      var aircrafts = new List<Aircraft>
      {
        new Aircraft {
          Id=0, IcaoId="C152", Manufacturer="Cessna", Model="152",
          AircraftType=EAircraftType.FixedWing, EngineType=EEngineType.Piston,
          WeightCategory=EWeightCategory.Small, IcaoWakeCategory=EIcaoWakeCategory.Light,
          FuelType=EFuelType.AvGas,
          CruiseSpeed=107, FuelCapacity=26, MaxRange=415, ServiceCeiling=14700
        },
        new Aircraft {
          Id=1, IcaoId="C152", Manufacturer="Cessna", Model="152", Variant="Long-Range",
          AircraftType=EAircraftType.FixedWing, EngineType=EEngineType.Piston,
          WeightCategory=EWeightCategory.Small, IcaoWakeCategory=EIcaoWakeCategory.Light,
          FuelType=EFuelType.AvGas,
          CruiseSpeed=107, FuelCapacity=38, MaxRange=691, ServiceCeiling=14700
        },
        new Aircraft {
          Id=2, IcaoId="C172", Manufacturer="Cessna", Model="172",
          AircraftType=EAircraftType.FixedWing, EngineType=EEngineType.Piston,
          WeightCategory=EWeightCategory.Small, IcaoWakeCategory=EIcaoWakeCategory.Light,
          FuelType=EFuelType.AvGas,
          CruiseSpeed=122, FuelCapacity=56, MaxRange=696, ServiceCeiling=13500
        },
        new Aircraft {
          Id=3, IcaoId="A320", Manufacturer="Airbus", Model="320",
          AircraftType=EAircraftType.FixedWing, EngineType=EEngineType.Jet,
          WeightCategory=EWeightCategory.Large, IcaoWakeCategory=EIcaoWakeCategory.Medium,
          FuelType=EFuelType.JetA, MTOW=172000,
          CruiseSpeed=447, FuelCapacity=6400, MaxRange=3300, ServiceCeiling=39100
        }
      };

      return aircrafts;
    }
  }
}