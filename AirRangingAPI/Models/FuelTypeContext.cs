using Microsoft.EntityFrameworkCore;

namespace AirRangingAPI.Models
{
    public class FuelTypeContext : DbContext
    {
        public FuelTypeContext(
          DbContextOptions<FuelTypeContext> options) : base(options) { }
        
        public DbSet<FuelType> FuelTypes { get; set; }
    }
}