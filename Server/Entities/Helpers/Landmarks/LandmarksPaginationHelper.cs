using System.Collections.Generic;
using Entities.Models.Landmarks;
using Entities.Models.Pagination;

namespace Entities.Helpers.Landmarks
{
    public class LandmarksPaginationHelper : ILandmarksPaginationHelper
    {
        public PagedList<Landmark> ApplyPagination(IEnumerable<Landmark> landmarks, LandmarkParameters parameters)
        {
            var pagedLandmarks = PagedList<Landmark>.ToPagedList(
                landmarks,
                parameters.PageNumber,
                parameters.PageSize
            );

            return pagedLandmarks;
        }
    }
}