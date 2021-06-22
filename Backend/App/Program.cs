using System;
using System.Threading.Tasks;
using Entities;
using Entities.Data;
using Entities.Models.Identity;
using Logger;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace App
{
  public class Program
    {
        public async static Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            // host.Services.GetRequiredService<ILogger<Program>>();

            host.MigrateDatabase();

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var logger = services.GetRequiredService<LoggerManager>();

                try
                {
                    var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
                    var context = services.GetRequiredService<RepositoryContext>();
                    await DataContextSeeding.SeedDefaultUser(userManager);
                    await DataContextSeeding.SeedExamples(context, userManager);
                }
                catch (Exception ex)
                {
                    logger.LogError($"An error ocurred seeding the DB: {ex.Message}");
                }
            }

            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
