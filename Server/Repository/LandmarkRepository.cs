using Data;
using Contracts.Landmarks;
using Entities.Models.Landmarks;
using Entities.Helpers;
using Entities.Helpers.Landmarks;
using System.Collections.Generic;
using System.Linq;

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

        /*
            GET
            CREATE
            DELETE
            UPDATE
            SAVE
            UNSAVE
        */

        // TODO: repo actions

        public IEnumerable<Landmark> FilterLandmarks(IEnumerable<Landmark> landmarks, LandmarkParameters parameters)
        {
            return _filterHelper.ApplyFilter(landmarks, parameters);
        }

        public IEnumerable<Landmark> SortLandmarks(IEnumerable<Landmark> landmarks, LandmarkParameters parameters)
        {
            var queryableLandmarks = landmarks.AsQueryable();
            return _sortHelper.ApplySort(queryableLandmarks, parameters.OrderBy);
        }

        public IEnumerable<Landmark> PaginatedLandmarks(IEnumerable<Landmark> landmarks, LandmarkParameters parameters)
        {
            return _paginationHelper.ApplyPagination(landmarks, parameters);
        }
    }
}