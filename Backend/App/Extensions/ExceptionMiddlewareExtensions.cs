using App.Middleware;
using Microsoft.AspNetCore.Builder;

namespace App.Extensions
{
  public static class ExceptionMiddlewareExtensions
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionMiddleware>();
        }
    }
}