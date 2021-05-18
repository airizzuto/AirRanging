using System.ComponentModel.DataAnnotations;
using API.Domain.Models.Enums;

namespace API.Domain.Models
{
  public class Aircraft
  {
    // TODO: Validation
    public int Id { get; set; }    
    public string IcaoId { get; set; }
    public string Manufacturer { get; set; }
    public string Model { get; set; }
    public string Variant { get; set; }
    public EAircraftType AircraftType { get; set; }
    public EEngineType EngineType { get; set; }
    public EWeightCategory WeightCategory { get; set; }
    public EIcaoWakeCategory IcaoWakeCategory { get; set; }
    public EFuelType FuelType { get; set; }
    public int MTOW { get; set; }
    public int CruiseSpeed { get; set; }
    public decimal FuelCapacity { get; set; }
    // TODO: Convert Fuel Weight <-> Volume
    public decimal MaxRange { get; set; }

    public int ServiceCeiling { get; set; }
  }
}