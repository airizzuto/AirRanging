using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using App.Extensions.Configurations;
using Entities.Models.Identity;
using Data;
using Npgsql;
using App.Services;

namespace App.Injectors
{
    public class DbInjector : IInjector
    {
        public void InjectServices(IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("AirRangingDB");

            var builder = new NpgsqlConnectionStringBuilder(connectionString) {
                Username = configuration["DB:Username"],
                Password = configuration["DB:Password"]
            };

            services.AddDbContext<ApplicationDbContext>(opt =>
                opt.UseNpgsql(
                    builder.ConnectionString,
                    npgsqlOptionsAction: opt => 
                    {
                        opt.EnableRetryOnFailure();
                        opt.MigrationsAssembly("App");
                    }
                ).EnableDetailedErrors()
            );

            services.AddDataProtection();

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders()
                .AddTokenProvider<EmailConfirmationTokenProvider<ApplicationUser>>("emailconfirmation");

            services.Configure<DataProtectionTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromHours(2));
            services.Configure<EmailConfirmationTokenProviderOptions>(opt =>
                opt.TokenLifespan = TimeSpan.FromDays(3));

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.ConfigureRepositoryWrapper();
        }
    }
}