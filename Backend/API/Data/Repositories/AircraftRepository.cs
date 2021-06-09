using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using API.Models.Common;
using System.Linq;

namespace API.Data.Repositories
{
    public class AircraftRepository : BaseRepository, IAircraftRepository
    {
        public AircraftRepository(ApplicationDbContext context) : base(context) 
        {

        }

        public async Task<IEnumerable<Aircraft>> GetAllAircraftsAsync(
            PaginationFilter paginationFilter = null)
        {
            if (paginationFilter == null)
            {
                return await _context.Aircrafts.ToListAsync();
            }

            // Pagination entities skip
            var skip = (paginationFilter.PageNumber - 1) * paginationFilter.PageSize;

            return await _context.Aircrafts // TODO: solve EF query OrderBy warning
                .Skip(skip)
                .OrderBy(aircraft => aircraft.SavesCount)
                .Take(paginationFilter.PageSize)
                .ToListAsync();
        }

        public async Task<Aircraft> GetAircraftByIdAsync(Guid id)
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

        public async Task<bool> UserOwnsAircraftAsync(Guid id, string getUserId)
        {
            var aircraft = await _context.Aircrafts
                .AsNoTracking()
                .SingleOrDefaultAsync(a => a.Id == id);
            
            if (aircraft == null)
            {
                return false;
            }

            if (aircraft.UserId != getUserId)
            {
                return false;
            }

            return true;
        }
    }
}