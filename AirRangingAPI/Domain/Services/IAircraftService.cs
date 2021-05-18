using System.Collections.Generic;
using System.Threading.Tasks;
using AirRangingAPI.Domain.Models;

namespace AirRangingAPI.Domain.Services
{
    public interface IAircraftService
    {
        Task<IEnumerable<Aircraft>> ListAsync();
    }
}