using System;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace App.Extensions.Configurations
{
    public static class DataProtectionTokenProviderConfiguration
    {
        public static void ConfigureDataProtectionTokens(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<DataProtectionTokenProviderOptions>(opt => 
                opt.TokenLifespan = TimeSpan.FromHours(3)
            );
        }
    }
}