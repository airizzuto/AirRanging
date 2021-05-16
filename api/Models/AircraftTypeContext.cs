using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class AircraftTypeContext : DbContext
    {
        public AircraftTypeContext(
          DbContextOptions<AircraftTypeContext> options) : base(options) { }
        
        public DbSet<AircraftType> AircraftTypes { get; set; }
    }
}