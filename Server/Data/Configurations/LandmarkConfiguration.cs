using Entities.Models.Landmarks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Data.Configurations
{
  public class LandmarkConfiguration : IEntityTypeConfiguration<Landmark>
  {
        // TODO
        public void Configure(EntityTypeBuilder<Landmark> builder)
        {
            builder.ToTable("Landmarks");

            builder.HasKey(l => l.Id);

            builder.Property(l => l.Id)
                .ValueGeneratedOnAdd();

            // TODO: additional config

            builder.Property(l => l.SavesCount)
                .HasDefaultValue(1);

            builder.Property(l => l.CreatedDate)
                .ValueGeneratedOnAdd();

            builder.HasOne(l => l.User)
                .WithMany(u => u.LandmarksOwned)
                .HasForeignKey(a => a.UserId);
        }
    }
}