using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using Data;
using Entities.Models.Aircrafts;
using Entities.Models.Pagination;
using Entities.Helpers;
using Contracts.Aircrafts;
using System.Collections.Generic;

namespace Repository
{
    public class AircraftRepository : BaseRepository<Aircraft>, IAircraftRepository
    {
        private readonly ISortHelper<Aircraft> _sortHelper;
        private readonly IAircraftsFilterHelper _filterHelper;
        private readonly IAircraftsPaginationHelper _paginationHelper;

        public AircraftRepository(
            ApplicationDbContext context,
            ISortHelper<Aircraft> sortHelper,
            IAircraftsFilterHelper filterHelper,
            IAircraftsPaginationHelper paginationHelper) : base(context) 
        {
            _sortHelper = sortHelper;
            _filterHelper = filterHelper;
            _paginationHelper = paginationHelper;
        }

        /// <summary>
        /// Retrieves all aircrafts in context.
        /// </summary>
        /// <param name="parameters">Aircraft parameters</param>
        /// <returns>List of all aircrafts</returns>
        public async Task<IEnumerable<Aircraft>> GetAllAircraftsAsync()
        {
            return await FindAll().ToListAsync();
        }

        /// <summary>
        /// Retrieves aircraft matching id parameter.
        /// </summary>
        /// <param name="aircraftId">Aircraft ID</param>
        /// <returns>Aircraft</returns>
        public async Task<Aircraft> GetAircraftByIdAsync(string aircraftId)
        {
            return await FindByCondition(a => a.Id.Equals(Guid.Parse(aircraftId)))
                .FirstOrDefaultAsync();
        }

        /// <summary>
        /// Retrieves all aircrafts in context created by user id.
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="parameters">Aircrafts parameters</param>
        /// <returns>Paginated list of Aircraft</returns>
        public async Task<IEnumerable<Aircraft>> GetAircraftsOwnedAsync(string userId)
        {
            return await FindByCondition(a => a.UserId == userId)
                .Select(a => a)
                .ToListAsync();
        }

        /// <summary>
        /// Passes aircraft to be created by context.
        /// </summary>
        /// <param name="aircraft">Aircraft model</param>
        /// <param name="userId">User ID</param>
        public async Task<Aircraft> CreateAircraftAsync(Aircraft aircraft, string userId)
        {
            var user = await DbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);

            aircraft.Id = Guid.NewGuid();
            aircraft.UserId = userId;
            aircraft.AuthorUsername = user.UserName;
            aircraft.SavesCount = 1;
            aircraft.CreatedDate = DateTime.UtcNow;

            await DbContext.AddAsync(aircraft);

            return aircraft;
        }

        /// <summary>
        /// Passes aircraft to be updated by context.
        /// </summary>
        /// <param name="aircraft">Aircraft model</param>
        public void UpdateAircraft(Aircraft aircraft)
        {
            Update(aircraft);
        }

        /// <summary>
        /// Passes aircraft to be deleted by context.
        /// </summary>
        /// <param name="aircraft">Aircraft model</param>
        public void DeleteAircraft(Aircraft aircraft)
        {
            Delete(aircraft);
        }

        public Aircraft CountAircraftSaved(Aircraft aircraft)
        {
            aircraft.SavesCount += 1;
            UpdateAircraft(aircraft);

            return aircraft;
        }

        public Aircraft CountAircraftUnsaved(Aircraft aircraft)
        {
            aircraft.SavesCount -= 1;
            UpdateAircraft(aircraft);

            return aircraft;
        }

        public IEnumerable<Aircraft> FilterAircrafts(IEnumerable<Aircraft> aircrafts, AircraftParameters parameters)
        {
            return _filterHelper.ApplyFilter(aircrafts, parameters);
        }

        public IEnumerable<Aircraft> SortAircrafts(IEnumerable<Aircraft> aircrafts, AircraftParameters parameters)
        {
            var queryableAircrafts = aircrafts.AsQueryable();

            return _sortHelper.ApplySort(queryableAircrafts, parameters.OrderBy);
        }

        public PagedList<Aircraft> PaginatedAircrafts(IEnumerable<Aircraft> aircrafts, AircraftParameters parameters)
        {
            return _paginationHelper.ApplyPagination(aircrafts, parameters);
        }
    }
}