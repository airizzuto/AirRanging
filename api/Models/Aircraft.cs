namespace api.Models
{
  public class Aircraft
  {
    public int Id { get; set; }
    public string Icao { get; set; }
    public string Manufacturer { get; set; }
    public string Model { get; set; }
    public AircraftType AircraftType { get; set; }
    public EngineType EngineType { get; set; }
    public FluidType FuelType { get; set; }
    public WeightCategory WeightClass { get; set; }
    public decimal MaxFuel { get; set; }
    // TODO: FuelType
    // TODO: Converted Fuel Weight <-> Volume
    public int MaxRange { get; set; }
  }
}