using Entities.Data.Configurations;
using Entities.Models;
using Entities.Models.Aircrafts;
using Entities.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Entities.Data
{
    public class RepositoryContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Aircraft> Aircrafts { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        public RepositoryContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new AircraftConfiguration());
            builder.ApplyConfiguration(new ApplicationUserConfiguration());
            builder.ApplyConfiguration(new BookmarkConfiguration());
        }
    }
}
