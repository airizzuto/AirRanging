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

    public async Task<IEnumerable<Aircraft>> GetAllAircraftsAsync()
    {
      return await _context.Aircrafts.ToListAsync();
    }

    public async Task<Aircraft> GetAircraftByIdAsync(int id)
    {
      return await _context.Aircrafts.FindAsync(id);
    }
  }
}