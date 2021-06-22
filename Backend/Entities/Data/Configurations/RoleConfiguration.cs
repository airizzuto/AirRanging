using System;
using Constants;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Entities.Data.Configurations
{
    public class RoleConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(
                new IdentityRole
                {
                    Name = Authorization.Roles.Guest
                        .ToString(),

                    NormalizedName = Authorization.Roles.Guest
                        .ToString().ToUpperInvariant()
                },
                new IdentityRole
                {
                    Name = Authorization.Roles.User
                        .ToString(),
                    NormalizedName = Authorization.Roles.User
                        .ToString().ToUpperInvariant()
                },
                new IdentityRole
                {
                    Name = Authorization.Roles.Administrator
                        .ToString(),
                    NormalizedName = Authorization.Roles.Administrator
                        .ToString().ToUpperInvariant()
                }
            );
        }
    }
}