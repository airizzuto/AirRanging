using System;
using Entities.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;
using App.Extensions;
using Entities.Models.Identity;

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

            services.AddIdentityCore<ApplicationUser>()
                // TODO REFACTOR: Review use of default implementation instead of custom token and refresh token 
                // .AddDefaultTokenProviders()
                .AddEntityFrameworkStores<RepositoryContext>();

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.ConfigureRepositoryWrapper();
        }
    }
}