using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities.Models.Aircrafts;
using Entities.Models.Pagination;

namespace Entities.Helpers
{
    public interface IAircraftsPaginationHelper
    {
        PagedList<Aircraft> ApplyPagination(
            IEnumerable<Aircraft> aircrafts, AircraftParameters parameters
        );
    }
}