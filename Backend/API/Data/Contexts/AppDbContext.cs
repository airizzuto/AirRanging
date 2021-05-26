using System.Reflection;
using API.Domain.Models;
using API.Domain.Models.Enums;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Contexts
{
    public class AppDbContext : DbContext
    {
        public DbSet<Aircraft> Aircrafts { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());

            base.OnModelCreating(builder);
        }
    }
}
