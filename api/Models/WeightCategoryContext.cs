using Microsoft.EntityFrameworkCore;

namespace api.Models
{
    public class WeightCategoryContext : DbContext
    {
        public WeightCategoryContext(
          DbContextOptions<WeightCategoryContext> options) : base(options) { }
        
        public DbSet<WeightCategory> WeightCategories { get; set; }
    }
}