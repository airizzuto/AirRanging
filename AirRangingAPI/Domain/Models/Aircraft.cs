using System.ComponentModel.DataAnnotations;
using AirRangingAPI.Domain.Models.Enums;

namespace AirRangingAPI.Domain.Models
{
  public class Aircraft
  {
    // TODO: Validation
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(4)]
    public string Icao { get; set; }

    [Required]
    public string Manufacturer { get; set; }

    [Required]
    public string Model { get; set; }

    public string Variant { get; set; }
    public EAircraftType AircraftType { get; set; }
    public EEngineType EngineType { get; set; }
    public EWeightCategory WeightCategory { get; set; }
    public EWakeCategory WakeCategory { get; set; }
    public EFuelType FuelType { get; set; }

    public int MTOW { get; set; }

    public int CruiseSpeed { get; set; }

    [Required]
    public decimal FuelCapacity { get; set; }
    // TODO: Converted Fuel Weight <-> Volume

    [Required]
    public decimal MaxRange { get; set; }

    public int ServiceCeiling { get; set; }
  }
}