using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;
using API.Domain.Repositories;
using API.Persistance.Contexts;
using Microsoft.EntityFrameworkCore;

namespace API.Persistance.Repositories
{
  public class AircraftRepository : BaseRepository, IAircraftRepository
  {
    public AircraftRepository(AppDbContext context) : base(context) { }

    public Aircraft GetById()
    {
      throw new System.NotImplementedException();
    }

    public async Task<IEnumerable<Aircraft>> ListAsync()
    {
      return await _context.Aircrafts.ToListAsync();
    }
  }
}