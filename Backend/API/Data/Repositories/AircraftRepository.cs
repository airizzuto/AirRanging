using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Data.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using API.Models.Filters;
using System.Linq;
using API.Models.Enums;
using Microsoft.Extensions.Logging;

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
                .OrderByDescending(aircraft => aircraft.SavesCount)
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

        private static IQueryable<Aircraft> AddQueriesFilter(
            GetAllAircraftsFilter filter, IQueryable<Aircraft> queryable)
        {
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

            if (filter?.AircraftType != null && filter?.AircraftType != EAircraftType.Unknown)
            {
                queryable = queryable.Where(a =>
                    a.AircraftType.Equals(filter.AircraftType));
            }

            if (filter?.EngineType != null && filter?.EngineType != EEngineType.Unknown)
            {
                queryable = queryable.Where(a =>
                    a.EngineType.Equals(filter.EngineType));
            }

            if (filter?.WeightCategory != null && filter?.WeightCategory != EWeightCategory.Unknown)
            {
                queryable = queryable.Where(a =>
                    a.WeightCategory.Equals(filter.WeightCategory));
            }

            if (filter?.IcaoWakeCategory != null && filter?.IcaoWakeCategory != EIcaoWakeCategory.Unknown)
            {
                queryable = queryable.Where(a =>
                    a.IcaoWakeCategory.Equals(filter.IcaoWakeCategory));
            }

            if (filter?.FuelType != null && filter?.FuelType != EFuelType.Unknown)
            {
                queryable = queryable.Where(a =>
                    a.FuelType.Equals(filter.FuelType));
            }

            //FIXME: int and decimal filtering
            if (filter?.EngineCount != null && filter?.EngineCount != 0)
            {
                queryable = queryable.Where(a => a.EngineCount == filter.EngineCount);
            }

            if (filter?.MaxRange != null && filter?.MaxRange != 0)
            {
                queryable = queryable.Where(a => a.MaxRange >= filter.MaxRange); 
            }

            if (!string.IsNullOrEmpty(filter?.Username))
            {
                queryable = queryable.Where(a =>
                    a.Username.ToLower() == filter.Username.ToLower());
            }

            return queryable;
        }
    }
}