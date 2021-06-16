using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entities.Data.Configurations
{
    public class BookmarkConfiguration : IEntityTypeConfiguration<Bookmark>
    {
        public void Configure(EntityTypeBuilder<Bookmark> builder)
        {
            builder.HasKey(ua => new { ua.UserId, ua.AircraftId });

            builder.HasOne(ua => ua.Aircraft)
                .WithMany(a => a.Bookmarks)
                .HasForeignKey(ua => ua.AircraftId);
            
            builder.HasOne(ua => ua.User)
                .WithMany(u => u.Bookmarks)
                .HasForeignKey(ua => ua.UserId);
        }
    }
}