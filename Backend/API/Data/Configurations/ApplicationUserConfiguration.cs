using API.Models.Account;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.Data.Configurations
{
    public class ApplicationUserConfiguration : IEntityTypeConfiguration<ApplicationUser>
    {
        public void Configure(EntityTypeBuilder<ApplicationUser> builder)
        {
            builder.HasMany(user => user.UserAircrafts)
                .WithOne()
                .HasForeignKey(aircraft => aircraft.Id);
            
            builder.HasMany(user => user.SavedAircrafts)
                .WithOne()
                .HasForeignKey(aircraft => aircraft.Id);
        }
    }
}