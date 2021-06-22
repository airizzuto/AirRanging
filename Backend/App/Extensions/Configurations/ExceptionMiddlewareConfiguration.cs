using App.Middleware;
using Microsoft.AspNetCore.Builder;

namespace App.Extensions.Configurations
{
  public static class ExceptionMiddlewareConfiguration
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}