using Data.Configurations;
using Entities.Models.Bookmarks;
using Entities.Models.Aircrafts;
using Entities.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Aircraft> Aircrafts { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Bookmark> Bookmarks { get; set; }

        // DbSet<ApplicationUser> already declared on extension with IdentityDbContext<ApplicationUser>

        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new AircraftConfiguration());
            builder.ApplyConfiguration(new ApplicationUserConfiguration());
            builder.ApplyConfiguration(new RoleConfiguration());
            builder.ApplyConfiguration(new BookmarkConfiguration());
        }
    }
}
