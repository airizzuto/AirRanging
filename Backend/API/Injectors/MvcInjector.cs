using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using API.Conventions;
using API.Settings;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

namespace API.Injectors
{
    public class MvcInjector : IInjector
    {
        public void InjectServices(IServiceCollection services, IConfiguration configuration)
        {
            var jwtSettings = new JwtSettings();
            services.AddSingleton(jwtSettings);

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(configuration["Jwt:Secret"])),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireExpirationTime = false,
                    ValidateLifetime = true,
                };
            });

            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_3_0)
                .AddJsonOptions(options => {
                    options.JsonSerializerOptions.Converters.Add(
                        new JsonStringEnumConverter(JsonNamingPolicy.CamelCase));
                    })
                .AddNewtonsoftJson(options => {
                        options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                    })
                .AddFluentValidation(fv => { 
                    fv.RegisterValidatorsFromAssemblyContaining<Startup>();
                    fv.RunDefaultMvcValidationAfterFluentValidationExecutes = false;
                });

            services.AddControllers(options => {
                options.Conventions.Add(new GroupingByNamespaceConvention());
            });

            services.AddApiVersioning(options =>
                {
                    options.AssumeDefaultVersionWhenUnspecified = true;
                    options.DefaultApiVersion = ApiVersion.Default;
                    options.ApiVersionReader = ApiVersionReader.Combine( 
                        new HeaderApiVersionReader("X-Version"),
                        new MediaTypeApiVersionReader("version")
                    );
                    options.ReportApiVersions = true;
                }
            );

            services.AddSwaggerGen(c =>
            {
                var titleBase = "AirRanging API";
                var description = "Web API for Aircraft Route Planning";
                var license = new OpenApiLicense() { Name = "MIT" };

                c.SwaggerDoc("v1", new OpenApiInfo 
                {
                    Version = "v1",
                    Title = titleBase + "v1",
                    Description = description,
                });
                
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme.",
                });
            });
        }
    }
}