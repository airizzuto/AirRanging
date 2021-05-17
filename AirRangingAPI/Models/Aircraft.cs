using System.ComponentModel.DataAnnotations;
using AirRangingAPI.Enums;

namespace AirRangingAPI.Models
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
    public AircraftTypes AircraftType { get; set; }
    public EngineTypes EngineType { get; set; }
    public WeightCategories WeightClass { get; set; }
    public WakeCategories WakeCategory { get; set; }
    public FuelTypes FuelType { get; set; }

    public int MTOW { get; set; }

    [Required]
    public int CruiseSpeed { get; set; }

    [Required]
    public decimal FuelCapacity { get; set; }
    // TODO: Converted Fuel Weight <-> Volume

    [Required]
    public decimal MaxRange { get; set; }

    [Required]
    public int ServiceCeiling { get; set; }
  }
}