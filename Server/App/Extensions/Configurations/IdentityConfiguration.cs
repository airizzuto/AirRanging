using System;
using System.Text;
using Contracts;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Constants;
using Repository.Settings;
using App.Services;
using Microsoft.AspNetCore.Authorization;

namespace App.Extensions.Configurations
{
    public static class IdentityConfiguration
    {
        public static void ConfigureIdentity(
            this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<IdentityOptions>(options =>
            {
                // Password settings.
                options.Password.RequireDigit = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequiredLength = 8;
                options.Password.RequiredUniqueChars = 1;

                // Lockout settings.
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(5);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Lockout.AllowedForNewUsers = true;

                // User settings.
                options.User.AllowedUserNameCharacters =
                    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._+";
                options.User.RequireUniqueEmail = true;

                options.SignIn.RequireConfirmedEmail = true;

                options.Tokens.EmailConfirmationTokenProvider = "emailconfirmation";
            });

            var jwtSettings = new JwtSettings();
            configuration.Bind(nameof(jwtSettings), jwtSettings);
            services.AddSingleton(jwtSettings);

            services.AddTransient<ITokenService, TokenService>();

            var tokenValidationParameters = new TokenValidationParameters
            {
                ClockSkew = TimeSpan.Zero,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
                ValidIssuer = Path.Local.Full + "/airrangingapi",
                ValidAudience = Path.Local.Full + "/airranginguser",
                ValidateIssuerSigningKey = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                RequireExpirationTime = true,
            };

            services.AddSingleton(tokenValidationParameters);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = tokenValidationParameters;
            });

            services.AddAuthorization(options => 
            {
                var defaultAuthBuilder = new AuthorizationPolicyBuilder();
                var defaultAuthPolicy = defaultAuthBuilder
                    .RequireAuthenticatedUser()
                    .Build();

                options.DefaultPolicy = defaultAuthPolicy;
            });
        }
    }
}