using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class WakeCategoryContext : DbContext
    {
        public WakeCategoryContext(
          DbContextOptions<WakeCategoryContext> options) : base(options) { }
        
        public DbSet<WakeCategory> WakeCategories { get; set; }
    }
}