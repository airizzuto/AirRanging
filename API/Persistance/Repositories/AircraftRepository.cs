using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;
using API.Domain.Repositories;
using API.Domain.Services.Communication;
using API.Persistance.Contexts;
using Microsoft.EntityFrameworkCore;

namespace API.Persistance.Repositories
{
    public class AircraftRepository : BaseRepository, IAircraftRepository
    {
        public AircraftRepository(AppDbContext context) : base(context) { }

        public async Task<IEnumerable<Aircraft>> GetAllAsync()
        {
            return await _context.Aircrafts.ToListAsync();
        }

        public async Task<Aircraft> FindAsync(int id)
        {
            return await _context.Aircrafts.FindAsync(id);
        }

        public async Task AddAsync(Aircraft aircraft)
        {
            await _context.Aircrafts.AddAsync(aircraft);
        }

        public void Update(Aircraft aircraft)
        {
            _context.Aircrafts.Update(aircraft);
        }

        public void Remove(Aircraft aircraft)
        {
            _context.Aircrafts.Remove(aircraft);
        }
    }
}