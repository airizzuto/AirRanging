namespace AirRangingAPI.Models
{
  public class Aircraft
  {
    public int Id { get; set; }
    public string Icao { get; set; }
    public string Manufacturer { get; set; }
    public string Model { get; set; }
    public AircraftType AircraftType { get; set; }
    public EngineType EngineType { get; set; }
    public WeightCategory WeightClass { get; set; }
    public WakeCategory WakeCategory { get; set; }
    public FuelType FuelType { get; set; }
    public decimal MaxFuel { get; set; }
    // TODO: Converted Fuel Weight <-> Volume
    public decimal MaxRange { get; set; }
  }
}