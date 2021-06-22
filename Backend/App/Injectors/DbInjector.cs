using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using App.Extensions.Configurations;
using Entities.Models.Identity;
using Entities.Data;
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

            services.AddDbContext<RepositoryContext>(
                opt => opt.UseNpgsql(
                    builder.ConnectionString,
                    opt => opt.MigrationsAssembly("App")
                )
            );

            services.AddIdentity<ApplicationUser, IdentityRole>()
                // TODO REFACTOR: Review use of default implementation instead of custom token and refresh token 
                // .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<RepositoryContext>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.ConfigureRepositoryWrapper();
        }
    }
}