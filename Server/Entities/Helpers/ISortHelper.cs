using System.Collections.Generic;
using System.Linq;

namespace Entities.Helpers
{
    public interface ISortHelper<T>
    {
        IEnumerable<T> ApplySort(IQueryable<T> entities, string orderByQueryString);
    }
}