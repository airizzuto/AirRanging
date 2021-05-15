namespace api.Models
{
  public class Aircraft
  {
    public string Id { get; set; } // TODO: icao or guid?
    public string Manufacturer { get; set; }
    public string Model { get; set; }
    public string Class { get; set; }
    public decimal MaxFuel { get; set; }
    // TODO: FuelType
    // TODO: Converted Fuel Weight <-> Volume
    public int MaxRange { get; set; }
  }
}