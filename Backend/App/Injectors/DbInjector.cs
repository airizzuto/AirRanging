using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using App.Extensions.Configurations;
using Entities.Models.Identity;
using Data;
using Npgsql;

namespace App.Injectors
{
    public class DbInjector : IInjector
    {
        public void InjectServices(IServiceCollection services, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("AirRangingDB");
            var dbPassword = configuration["DbPassword"];

            var builder = new NpgsqlConnectionStringBuilder(connectionString) {
                Password = dbPassword
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

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.ConfigureRepositoryWrapper();
        }
    }
}