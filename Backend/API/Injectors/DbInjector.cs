using System;
using API.Data.Contexts;
using API.Data.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace API.Injectors
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

            services.AddDbContext<ApplicationDbContext>(
                opt => opt.UseNpgsql(builder.ConnectionString)
            );

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<IAircraftRepository, AircraftRepository>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
        }
    }
}