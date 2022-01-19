using Data.Configurations;
using Entities.Models.Bookmarks;
using Entities.Models.Aircrafts;
using Entities.Models.Landmarks;
using Entities.Models.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Aircraft> Aircrafts { get; set; }
        public DbSet<Landmark> Landmarks { get; set; }
        public DbSet<Bookmark<Aircraft>> AircraftBookmarks { get; set; }
        public DbSet<Bookmark<Landmark>> LandmarkBookmarks { get; set; }

        public ApplicationDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder) 
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new ApplicationUserConfiguration());
            builder.ApplyConfiguration(new RoleConfiguration());
            builder.ApplyConfiguration(new AircraftConfiguration());
            builder.ApplyConfiguration(new LandmarkConfiguration());
            builder.ApplyConfiguration(new BookmarkConfiguration<Aircraft>());
            builder.ApplyConfiguration(new BookmarkConfiguration<Landmark>());
        }
    }
}
