using Microsoft.EntityFrameworkCore;

namespace AirRangingAPI.Models
{
  public class AircraftContext : DbContext
  {
    public AircraftContext(
      DbContextOptions<AircraftContext> options) : base(options) { }

    public DbSet<Aircraft> AircraftItems { get; set; }
  }
}