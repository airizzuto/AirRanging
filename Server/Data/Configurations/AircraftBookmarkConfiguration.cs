using Entities.Models.Aircrafts;
using Entities.Models.Bookmarks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class AircraftBookmarkConfiguration : IEntityTypeConfiguration<Bookmark<Aircraft>>
    {
        public void Configure(EntityTypeBuilder<Bookmark<Aircraft>> builder)
        {
            builder.HasKey(ua => new { ua.UserId, ua.ResourceId });

            builder.HasOne(ua => ua.Resource)
                .WithMany(a => a.AircraftBookmarks)
                .HasForeignKey(ua => ua.ResourceId);
            
            builder.HasOne(ua => ua.User)
                .WithMany(u => u.AircraftsBookmarks)
                .HasForeignKey(ua => ua.UserId);
        }
    }
}