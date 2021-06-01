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
        IConfiguration _configuration;
        public void InjectServices(IServiceCollection services, IConfiguration configuration)
        {
            _configuration = configuration;

            var connectionString = _configuration.GetConnectionString("AirRangingDB");
            var dbPassword = _configuration["DbPassword"];

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