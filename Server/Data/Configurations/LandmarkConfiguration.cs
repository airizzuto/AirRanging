using Entities.Models.Landmarks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
    public class LandmarkConfiguration : IEntityTypeConfiguration<Landmark>
    {
        public void Configure(EntityTypeBuilder<Landmark> builder)
        {
            builder.ToTable("Landmarks");

            builder.HasKey(l => l.Id);

            builder.Property(l => l.Id)
                .ValueGeneratedOnAdd();

            builder.Property(l => l.Name)
                .IsRequired()
                .HasMaxLength(250);

            builder.Property(l => l.Description);

            builder.Property(l => l.Latitude)
                .IsRequired();

            builder.Property(l => l.Longitude)
                .IsRequired();

            builder.Property(l => l.Altitude);

            builder.Property(l => l.ImageUrl);

            builder.Property(l => l.CreatedDate)
                .HasDefaultValueSql("now()");

            builder.Property(l => l.ModifiedDate)
                .HasDefaultValueSql("now()");

            builder.Property(l => l.SavesCount)
                .HasDefaultValue(1);

            builder.HasOne(l => l.User)
                .WithMany(u => u.LandmarksOwned)
                .HasForeignKey(a => a.UserId);
        }
    }
}