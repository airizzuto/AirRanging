using System.Net.Http;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Threading.Tasks;
using Entities.DTOs.V1.Aircrafts;
using Entities.DTOs.V1.Identity;
using Data;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using App;

namespace Tests
{
    public class IntegrationTest
    {
        protected readonly HttpClient TestClient;
        public IntegrationTest()
        {
            var appFactory = new WebApplicationFactory<Startup>()
                .WithWebHostBuilder(builder => 
                {
                    builder.ConfigureServices(services =>
                    {
                        services.RemoveAll(typeof(ApplicationDbContext));
                        services.AddDbContext<ApplicationDbContext>(options =>
                        {
                            options.UseInMemoryDatabase("TestDb");
                        });
                    });
                });
            TestClient = appFactory.CreateClient();
        }

        protected async Task AuthenticateAsync()
        {
            TestClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("bearer", await GetJwtAsync());
        }

        protected async Task<AircraftReadDTO> CreateAircraftAsync(AircraftCreateDTO aircraftCreateDTO)
        {
            var response = await TestClient.PostAsJsonAsync("/api/aircrafts", aircraftCreateDTO);
            return await response.Content.ReadAsAsync<AircraftReadDTO>();
        }

        private async Task<string> GetJwtAsync()
        {
            var response = await TestClient.PostAsJsonAsync("/account/register", new UserRegistrationDTO
            {
                UserName = "tester",
                Email = "test@testmail.com",
                Password = "P4ssw0rd"
            });

            var registrationResponse = await response.Content
                .ReadAsAsync<AuthenticationDTO>();
            return registrationResponse.Token;
        }
    }
}