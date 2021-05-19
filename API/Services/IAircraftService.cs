using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;

namespace API.Services
{
    public interface IAircraftService
    {
        Task<IEnumerable<Aircraft>> ListAsync();
    }
}