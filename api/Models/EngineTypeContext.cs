using Microsoft.EntityFrameworkCore;

namespace api.Models
{
  public class EngineTypeContext : DbContext
  {
    public EngineTypeContext(
      DbContextOptions<EngineTypeContext> options) : base(options) { }

    public DbSet<EngineType> EngineTypes { get; set; }
  }
}