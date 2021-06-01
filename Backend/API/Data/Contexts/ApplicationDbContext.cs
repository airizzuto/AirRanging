using System.Reflection;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Aircraft> Aircrafts { get; set; }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }
    }
}
