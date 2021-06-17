using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Entities.Data;
using Entities.Models.Aircrafts;
using Contracts.Aircrafts;
using Entities.Models.Pagination;

namespace Repository
{
    public class AircraftRepository : BaseRepository<Aircraft>, IAircraftRepository
    {
        public AircraftRepository(RepositoryContext context) : base(context) 
        {

        }

        public async Task<PagedList<Aircraft>> GetAircraftsAsync(
            AircraftParameters parameters)
        {
            return await PagedList<Aircraft>.ToPagedList(
                FindAll().OrderBy(a => a.SavesCount),
                parameters.PageNumber,
                parameters.PageSize);
        }

        public async Task<Aircraft> GetAircraftByIdAsync(Guid id)
        {
            return await FindByCondition(a => a.Id.Equals(id))
                .FirstOrDefaultAsync();
        }

        // TODO: Test
        public async Task<PagedList<Aircraft>> GetAircraftsOwned(
            string userId, AircraftParameters parameters)
        {
            return await PagedList<Aircraft>.ToPagedList(
                FindByCondition(a => a.UserId == userId).OrderBy(a => a.SavesCount),
                parameters.PageNumber,
                parameters.PageSize);
        }

        // TODO: response.
        // TODO: REVIEW: other services injected
        // public async Task SaveToUserAsync(string userId, Guid Id)
        // {
        //     await _bookmarkService.SaveAsync(userId, Id);
        // }

        public void CreateAircraft(Aircraft aircraft)
        {
            Create(aircraft);
        }

        public void UpdateAircraft(Aircraft aircraft)
        {
            Update(aircraft);
        }

        public void DeleteAircraft(Aircraft aircraft)
        {
            Delete(aircraft);
        }

        public async Task<bool> UserOwnsAircraftAsync(Guid id, string getAuthorId)
        {
            var aircraft = await GetAircraftByIdAsync(id);
            
            if (aircraft == null)
            {
                return false;
            }

            if (aircraft.User.Id != getAuthorId)
            {
                return false;
            }

            return true;
        }

        // private static IQueryable<Aircraft> AddQueriesFilter(
        //     GetAllAircraftsFilter filter, IQueryable<Aircraft> queryable)
        // {
        //     if (!string.IsNullOrEmpty(filter?.IcaoId))
        //     {
        //         queryable = queryable.Where(a =>
        //             a.IcaoId.ToLower() == filter.IcaoId.ToLower());
        //     }

        //     if (!string.IsNullOrEmpty(filter?.Manufacturer))
        //     {
        //         queryable = queryable.Where(a =>
        //             a.Manufacturer.ToLower() == filter.Manufacturer.ToLower());
        //     }

        //     if (!string.IsNullOrEmpty(filter?.Model))
        //     {
        //         queryable = queryable.Where(a =>
        //             a.Model.ToLower() == filter.Model.ToLower());
        //     }

        //     if (!string.IsNullOrEmpty(filter?.Variant))
        //     {
        //         queryable = queryable.Where(a =>
        //             a.Variant.ToLower() == filter.Variant.ToLower());
        //     }

        //     if (filter?.AircraftType != null && filter?.AircraftType != EAircraftType.Unknown)
        //     {
        //         queryable = queryable.Where(a =>
        //             a.AircraftType.Equals(filter.AircraftType));
        //     }

        //     if (filter?.EngineType != null && filter?.EngineType != EEngineType.Unknown)
        //     {
        //         queryable = queryable.Where(a =>
        //             a.EngineType.Equals(filter.EngineType));
        //     }

        //     if (filter?.WeightCategory != null && filter?.WeightCategory != EWeightCategory.Unknown)
        //     {
        //         queryable = queryable.Where(a =>
        //             a.WeightCategory.Equals(filter.WeightCategory));
        //     }

        //     if (filter?.IcaoWakeCategory != null && filter?.IcaoWakeCategory != EIcaoWakeCategory.Unknown)
        //     {
        //         queryable = queryable.Where(a =>
        //             a.IcaoWakeCategory.Equals(filter.IcaoWakeCategory));
        //     }

        //     if (filter?.FuelType != null && filter?.FuelType != EFuelType.Unknown)
        //     {
        //         queryable = queryable.Where(a =>
        //             a.FuelType.Equals(filter.FuelType));
        //     }

        //     if (filter?.EngineCount != null && filter?.EngineCount != 0)
        //     {
        //         queryable = queryable.Where(a => a.EngineCount == filter.EngineCount);
        //     }

        //     if (filter?.MaxRange != null && filter?.MaxRange != 0)
        //     {
        //         queryable = queryable.Where(a => a.MaxRange >= filter.MaxRange); 
        //     }

        //     if (!string.IsNullOrEmpty(filter?.AuthorUsername))
        //     {
        //         queryable = queryable.Where(a =>
        //             a.User.NormalizedUserName == filter.AuthorUsername.ToUpper());
        //     }

        //     return queryable;
        // }
    }
}