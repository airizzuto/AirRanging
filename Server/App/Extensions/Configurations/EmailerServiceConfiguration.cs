using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Http.Features;
using Emailer;

namespace App.Extensions.Configurations
{
    public static class EmailerServiceConfiguration
    {
        public static void ConfigureEmailerService(
            this IServiceCollection services, IConfiguration configuration)
        {

            EmailConfiguration emailConfig = new()
            {
                From = configuration["Email:Address"],
                SmtpServer = "smtp.gmail.com",
                Port = 465,
                UserName = configuration["Email:Address"],
                Password = configuration["Email:Password"]
            };

            services.AddSingleton(emailConfig);
            services.AddScoped<IEmailSender, EmailSender>();

            services.Configure<FormOptions>(o => {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });
        }
    }
}