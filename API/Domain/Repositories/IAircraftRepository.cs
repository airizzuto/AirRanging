using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;

namespace API.Domain.Repositories
{
    public interface IAircraftRepository
    {
        Task<IEnumerable<Aircraft>> ListAsync();
        Aircraft GetById();
    }
}