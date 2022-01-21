using System.Collections.Generic;
using Entities.Models.Landmarks;
using Entities.Models.Pagination;

namespace Entities.Helpers.Landmarks
{
    public interface ILandmarksPaginationHelper
    {
        PagedList<Landmark> ApplyPagination(IEnumerable<Landmark> landmarks, LandmarkParameters parameters);
    }
}