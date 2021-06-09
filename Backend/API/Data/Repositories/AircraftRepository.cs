using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using API.Models.Filters;
using System.Linq;
using API.Models.Enums;

namespace API.Data.Repositories
{
    public class AircraftRepository : BaseRepository, IAircraftRepository
    {
        public AircraftRepository(ApplicationDbContext context) : base(context) 
        {

        }

        public async Task<IEnumerable<Aircraft>> GetAllAircraftsAsync(
            GetAllAircraftsFilter filter = null,
            PaginationFilter paginationFilter = null)
        {
            var queryable = _context.Aircrafts.AsQueryable();

            if (paginationFilter == null)
            {
                return await queryable.ToListAsync();
            }

            queryable = AddQueriesFilter(filter, queryable);

            // Pagination entities skip
            var skip = (paginationFilter.PageNumber - 1) * paginationFilter.PageSize;

            return await queryable // TODO: solve EF query OrderBy warning
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

        private static IQueryable<Aircraft> AddQueriesFilter(GetAllAircraftsFilter filter, IQueryable<Aircraft> queryable)
        {
            // FIXME: querying int, decimal, enums
            if (!string.IsNullOrEmpty(filter?.IcaoId))
            {
                queryable = queryable.Where(a =>
                    a.IcaoId.ToLower() == filter.IcaoId.ToLower());
            }

            if (!string.IsNullOrEmpty(filter?.Manufacturer))
            {
                queryable = queryable.Where(a =>
                    a.Manufacturer.ToLower() == filter.Manufacturer.ToLower());
            }

            if (!string.IsNullOrEmpty(filter?.Model))
            {
                queryable = queryable.Where(a =>
                    a.Model.ToLower() == filter.Model.ToLower());
            }

            if (!string.IsNullOrEmpty(filter?.Variant))
            {
                queryable = queryable.Where(a =>
                    a.Variant.ToLower() == filter.Variant.ToLower());
            }

            // TODO: test enum parsing and convertion from string
            // if (Enum.TryParse(filter?.AircraftType, out EAircraftType aircraftType))
            // {
            //     queryable = queryable.Where(a => a.AircraftType == aircraftType);
            // }

            // if (Enum.TryParse(filter?.EngineType, out EEngineType engineType))
            // {
            //     queryable = queryable.Where(a => a.EngineType == engineType);
            // }

            // if (filter?.EngineCount != null || filter?.EngineCount != 0)
            // {
            //     queryable = queryable.Where(a => a.EngineCount == filter.EngineCount);
            // }

            // if (Enum.TryParse(filter?.WeightCategory, out EWeightCategory weightCategory))
            // {
            //     queryable = queryable.Where(a => a.WeightCategory == weightCategory);
            // }

            // if (Enum.TryParse(filter?.IcaoWakeCategory, out EIcaoWakeCategory icaoWakeCategory))
            // {
            //     queryable = queryable.Where(a => a.IcaoWakeCategory == icaoWakeCategory);
            // }

            // if (Enum.TryParse(filter?.FuelType, out EFuelType fuelType))
            // {
            //     queryable = queryable.Where(a => a.FuelType == fuelType);
            // }

            // TODO: test or rename to clarify search of aircraft max range with more than the query value
            // if (filter?.MaxRange != null || filter?.MaxRange != 0)
            // {
            //     queryable = queryable.Where(a => a.MaxRange >= filter.MaxRange); 
            // }

            if (!string.IsNullOrEmpty(filter?.Username))
            {
                queryable = queryable.Where(a =>
                    a.Username.ToLower() == filter.Username.ToLower());
            }

            return queryable;
        }
    }
}