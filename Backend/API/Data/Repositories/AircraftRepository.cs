using System.Collections.Generic;
using System.Threading.Tasks;
using API.Domain.Models;
using API.Domain.Interfaces;
using API.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System;

namespace API.Data.Repositories
{
    public class AircraftRepository : BaseRepository, IAircraftRepository
    {
        public AircraftRepository(ApplicationDbContext context) : base(context) { }

        // TODO: error handling
        public async Task<IEnumerable<Aircraft>> GetAllAircraftsAsync()
        {
            return await _context.Aircrafts.ToListAsync();
        }

        public async Task<Aircraft> GetAircraftByIdAsync(int id)
        {
            return await _context.Aircrafts.FindAsync(id);
        }

        public async Task CreateAircraftAsync(Aircraft aircraft)
        {
            if (aircraft == null)
            {
                throw new ArgumentNullException(nameof(aircraft));
            }
            await _context.Aircrafts.AddAsync(aircraft);
        }

        public void UpdateAircraft(Aircraft aircraft)
        {
            _context.Aircrafts.Update(aircraft);
        }

        public void DeleteAircraft(Aircraft aircraft)
        {
            if (aircraft == null) 
            {
                throw new ArgumentNullException(nameof(aircraft));
            }
            _context.Aircrafts.Remove(aircraft);
        }
    }
}