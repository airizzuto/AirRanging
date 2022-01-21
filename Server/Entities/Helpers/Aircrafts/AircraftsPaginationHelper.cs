using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models.Aircrafts;
using Entities.Models.Pagination;

namespace Entities.Helpers.Aircrafts
{
    public class AircraftsPaginationHelper : IAircraftsPaginationHelper
    {
        public PagedList<Aircraft> ApplyPagination(IEnumerable<Aircraft> aircrafts, AircraftParameters parameters)
        {
            var pagedAircrafts = PagedList<Aircraft>.ToPagedList(
                aircrafts,
                parameters.PageNumber,
                parameters.PageSize
            );

            return pagedAircrafts;
        }
    }
}