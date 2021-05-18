using System.Collections.Generic;
using System.Threading.Tasks;
using AirRangingAPI.Domain.Models;

namespace AirRangingAPI.Domain.Repositories
{
    public interface IAircraftRepository
    {
        Task<IEnumerable<Aircraft>> ListAsync();
        Aircraft GetById();
    }
}