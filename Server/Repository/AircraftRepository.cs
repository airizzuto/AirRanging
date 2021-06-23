using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Data;
using Entities.Models.Aircrafts;
using Entities.Models.Pagination;
using Entities.Models.Enums;
using Entities.Helpers;
using Contracts.Aircrafts;

namespace Repository
{
    public class AircraftRepository : BaseRepository<Aircraft>, IAircraftRepository
    {
        private ISortHelper<Aircraft> _sortHelper;

        public AircraftRepository(
            ApplicationDbContext context,
            ISortHelper<Aircraft> sortHelper) : base(context) 
        {
            _sortHelper = sortHelper;
        }

        /// <summary>
        /// Retrieves all aircrafts in context.
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns>Paginated list of aircrafts</returns>
        public async Task<PagedList<Aircraft>> GetAllAircraftsAsync(
            AircraftParameters parameters)
        {
            var aircrafts = FindAll();
            var aircraftsSorted = _sortHelper.ApplySort(aircrafts, parameters.OrderBy);
        
            return await PagedList<Aircraft>.ToPagedList(
                aircraftsSorted,
                parameters.PageNumber,
                parameters.PageSize);
        }

        /// <summary>
        /// Retrieves all aircrafts in context that comply with search query parameters
        /// </summary>
        /// <param name="parameters"></param>
        /// <returns>Paginated list of aircrafts</returns>
        public async Task<PagedList<Aircraft>> GetAircraftsWithSearchAsync(AircraftParameters parameters)
        {
            var aircrafts = FindAll();

            #region Search Parameters
            SearchByIcaoId(ref aircrafts, parameters.IcaoId);
            SearchByManufacturer(ref aircrafts, parameters.Manufacturer);
            SearchByModel(ref aircrafts, parameters.Model);
            SearchByVariant(ref aircrafts, parameters.Variant);
            SearchByAuthor(ref aircrafts, parameters.AuthorUsername);
            SearchByEngineCount(ref aircrafts, parameters.EngineCount);
            SearchByGreaterThanMaxRange(ref aircrafts, parameters.MaxRange);
            SearchByAircraftType(ref aircrafts, parameters.AircraftType);
            SearchByEngineType(ref aircrafts, parameters.EngineType);
            SearchByFuelType(ref aircrafts, parameters.FuelType);
            SearchByWeightCategory(ref aircrafts, parameters.WeightCategory);
            #endregion

            var aircraftsSorted = _sortHelper.ApplySort(aircrafts, parameters.OrderBy);

            return await PagedList<Aircraft>.ToPagedList(
                aircraftsSorted,
                parameters.PageNumber,
                parameters.PageSize);
        }

        /// <summary>
        /// Retrieves aircraft matching id parameter.
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Aircraft</returns>
        public async Task<Aircraft> GetAircraftByIdAsync(Guid id)
        {
            return await FindByCondition(a => a.Id.Equals(id))
                .FirstOrDefaultAsync();
        }

        /// <summary>
        /// Retrieves all aircrafts in context created by user id.
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="parameters"></param>
        /// <returns>Paginated list of Aircraft</returns>
        public async Task<PagedList<Aircraft>> GetAircraftsOwnedAsync(
            string userId, AircraftParameters parameters)
        {
            var aircrafts = FindByCondition(a => a.UserId == userId);

            #region Search Parameters
            SearchByIcaoId(ref aircrafts, parameters.IcaoId);
            SearchByManufacturer(ref aircrafts, parameters.Manufacturer);
            SearchByModel(ref aircrafts, parameters.Model);
            SearchByVariant(ref aircrafts, parameters.Variant);
            SearchByEngineCount(ref aircrafts, parameters.EngineCount);
            SearchByGreaterThanMaxRange(ref aircrafts, parameters.MaxRange);
            SearchByAircraftType(ref aircrafts, parameters.AircraftType);
            SearchByEngineType(ref aircrafts, parameters.EngineType);
            SearchByFuelType(ref aircrafts, parameters.FuelType);
            SearchByWeightCategory(ref aircrafts, parameters.WeightCategory);
            #endregion

            var aircraftsSorted = _sortHelper.ApplySort(aircrafts, parameters.OrderBy);

            return await PagedList<Aircraft>.ToPagedList(
                aircraftsSorted,
                parameters.PageNumber,
                parameters.PageSize);
        }

        // TODO: response.
        // public async Task SaveToUserAsync(string userId, Guid Id)
        // {
        //     await _bookmarkService.SaveAsync(userId, Id);
        // }


        /// <summary>
        /// Passes aircraft to be created by context.
        /// </summary>
        /// <param name="aircraft"></param>
        public async Task CreateAircraftAsync(Aircraft aircraft)
        {
            await CreateAsync(aircraft);
        }

        /// <summary>
        /// Passes aircraft to be updated by context.
        /// </summary>
        /// <param name="aircraft"></param>
        public void UpdateAircraft(Aircraft aircraft)
        {
            Update(aircraft);
        }

        /// <summary>
        /// Passes aircraft to be deleted by context.
        /// </summary>
        /// <param name="aircraft"></param>
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


        // TODO: extract to separate file
        #region Search methods
        private static void SearchByIcaoId(
            ref IQueryable<Aircraft> aircrafts, string icaoId)
        {
            if (!aircrafts.Any() || string.IsNullOrWhiteSpace(icaoId)) return;

            aircrafts = aircrafts.Where(
                a => a.IcaoId.ToUpper().Contains(icaoId.Trim().ToUpper())
            );
        }

        private static void SearchByManufacturer(
            ref IQueryable<Aircraft> aircrafts, string manufacturer)
        {
            if (!aircrafts.Any() || string.IsNullOrWhiteSpace(manufacturer)) return;

            aircrafts = aircrafts.Where(
                a => a.Manufacturer.ToUpper().Contains(manufacturer.Trim().ToUpper()));
        }

        private static void SearchByModel(
            ref IQueryable<Aircraft> aircrafts, string model)
        {
            if (!aircrafts.Any() || string.IsNullOrWhiteSpace(model)) return;

            aircrafts = aircrafts.Where(
                a => a.Model.ToUpper().Contains(model.Trim().ToUpper()));
        }

        private static void SearchByVariant(
            ref IQueryable<Aircraft> aircrafts, string variant)
        {
            if (!aircrafts.Any() || string.IsNullOrWhiteSpace(variant)) return;

            aircrafts = aircrafts.Where(
                a => a.Variant.ToUpper().Contains(variant.Trim().ToUpper()));
        }

        private static void SearchByAuthor(
            ref IQueryable<Aircraft> aircrafts, string authorUsername)
        {
            if (!aircrafts.Any() || string.IsNullOrWhiteSpace(authorUsername)) return;

            aircrafts = aircrafts.Where(
                a => a.User.NormalizedUserName.Contains(
                    authorUsername.Trim().ToUpper())
            );
        }

        private static void SearchByEngineCount(
            ref IQueryable<Aircraft> aircrafts, uint engineCount)
        {
            if (!aircrafts.Any() || engineCount == 0) return;

            aircrafts = aircrafts.Where(a => a.EngineCount == engineCount);
        }

        private static void SearchByGreaterThanMaxRange(
            ref IQueryable<Aircraft> aircrafts, uint maxRange)
        {
            if (!aircrafts.Any() || maxRange == 0) return;

            aircrafts = aircrafts.Where(a => a.MaxRange >= maxRange);
        }

        private static void SearchByAircraftType(
            ref IQueryable<Aircraft> aircrafts, EAircraftType aircraftType)
        {
            if (!aircrafts.Any() || aircraftType == EAircraftType.Unknown)
                return;

            aircrafts = aircrafts.Where(a => a.AircraftType == aircraftType);
        }

        private static void SearchByEngineType(
            ref IQueryable<Aircraft> aircrafts, EEngineType engineType)
        {
            if (!aircrafts.Any() || engineType == EEngineType.Unknown)
                return;

            aircrafts = aircrafts.Where(a => a.EngineType == engineType);
        }

        private static void SearchByFuelType(
            ref IQueryable<Aircraft> aircrafts, EFuelType fuelType)
        {
            if (!aircrafts.Any() || fuelType == EFuelType.Unknown)
                return;

            aircrafts = aircrafts.Where(a => a.FuelType == fuelType);
        }

        private static void SearchByWeightCategory(
            ref IQueryable<Aircraft> aircrafts, EWeightCategory weightCategory)
        {
            if (!aircrafts.Any() || weightCategory == EWeightCategory.Unknown)
                return;

            aircrafts = aircrafts.Where(a => a.WeightCategory == weightCategory);
        }
        #endregion

    }
}