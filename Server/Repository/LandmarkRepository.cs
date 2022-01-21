using Data;
using Contracts.Landmarks;
using Entities.Models.Landmarks;
using Entities.Helpers;
using Entities.Helpers.Landmarks;
using System.Collections.Generic;
using System.Linq;
using Entities.Models.Pagination;
using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class LandmarkRepository : BaseRepository<Landmark>, ILandmarkRepository
    {
        private readonly ISortHelper<Landmark> _sortHelper;
        private readonly ILandmarksFilterHelper _filterHelper;
        private readonly ILandmarksPaginationHelper _paginationHelper;

        public LandmarkRepository(
            ApplicationDbContext context,
            ISortHelper<Landmark> sortHelper,
            ILandmarksFilterHelper filterHelper,
            ILandmarksPaginationHelper paginationHelper
        ) : base(context)
        {
            _sortHelper = sortHelper;
            _filterHelper = filterHelper;
            _paginationHelper = paginationHelper;
        }

        // TODO: DRY Aircraft and Landmarks repo

        /// <summary>
        /// Retrieves all landmarks in context.
        /// </summary>
        /// <param name="parameters">Landmark parameters</param>
        /// <returns>List of all landmarks</returns>
        public async Task<IEnumerable<Landmark>> GetAllLandmarksAsync()
        {
            return await FindAll().ToListAsync();
        }

        /// <summary>
        /// Retrieves landmark matching id parameter.
        /// </summary>
        /// <param name="landmarkId">Landmark ID</param>
        /// <returns>Landmark</returns>
        public async Task<Landmark> GetLandmarkByIdAsync(string landmarkId)
        {
            return await FindByCondition(l => l.Id.Equals(Guid.Parse(landmarkId)))
                .FirstOrDefaultAsync();
        }

        /// <summary>
        /// Retrieves all landmarks in context created by user id.
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <param name="parameters">Landmarks parameters</param>
        /// <returns>Paginated list of Landmark</returns>
        public async Task<IEnumerable<Landmark>> GetLandmarksOwnedAsync(string userId)
        {
            return await FindByCondition(l => l.UserId == userId)
                .Select(l => l)
                .ToListAsync();
        }

        /// <summary>
        /// Passes landmark to be created by context.
        /// </summary>
        /// <param name="landmark">Landmark model</param>
        /// <param name="userId">User ID</param>
        public async Task<Landmark> CreateLandmarkAsync(Landmark landmark, string userId)
        {
            var user = await DbContext.Users.FirstOrDefaultAsync(u => u.Id == userId);

            landmark.Id = Guid.NewGuid();
            landmark.UserId = userId;
            landmark.AuthorUsername = user.UserName;
            landmark.SavesCount = 1;
            landmark.CreatedDate = DateTime.UtcNow;

            await DbContext.AddAsync(landmark);

            return landmark;
        }

        /// <summary>
        /// Passes landmark to be updated by context.
        /// </summary>
        /// <param name="landmark">Landmark model</param>
        public void UpdateLandmark(Landmark landmark)
        {
            Update(landmark);
        }

        /// <summary>
        /// Passes landmark to be deleted by context.
        /// </summary>
        /// <param name="landmark">Landmark model</param>
        public void DeleteLandmark(Landmark landmark)
        {
            Delete(landmark);
        }

        public Landmark CountLandmarkSaved(Landmark landmark)
        {
            landmark.SavesCount += 1;
            UpdateLandmark(landmark);

            return landmark;
        }

        public Landmark CountLandmarkUnsaved(Landmark landmark)
        {
            landmark.SavesCount -= 1;
            UpdateLandmark(landmark);

            return landmark;
        }

        public IEnumerable<Landmark> FilterLandmarks(IEnumerable<Landmark> landmarks, LandmarkParameters parameters)
        {
            return _filterHelper.ApplyFilter(landmarks, parameters);
        }

        public IEnumerable<Landmark> SortLandmarks(IEnumerable<Landmark> landmarks, LandmarkParameters parameters)
        {
            var queryableLandmarks = landmarks.AsQueryable();
            return _sortHelper.ApplySort(queryableLandmarks, parameters.OrderBy);
        }

        public PagedList<Landmark> PaginatedLandmarks(IEnumerable<Landmark> landmarks, LandmarkParameters parameters)
        {
            return _paginationHelper.ApplyPagination(landmarks, parameters);
        }
    }
}