using Entities.Models.Landmarks;
using Entities.Models.Bookmarks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class LandmarkBookmarkConfiguration : IEntityTypeConfiguration<Bookmark<Landmark>>
    {
        public void Configure(EntityTypeBuilder<Bookmark<Landmark>> builder)
        {
            builder.HasKey(ua => new { ua.UserId, ua.ResourceId });

            builder.HasOne(ua => ua.Resource)
                .WithMany(a => a.LandmarkBookmarks)
                .HasForeignKey(ua => ua.ResourceId);
            
            builder.HasOne(ua => ua.User)
                .WithMany(u => u.LandmarksBookmarks)
                .HasForeignKey(ua => ua.UserId);
        }
    }
}