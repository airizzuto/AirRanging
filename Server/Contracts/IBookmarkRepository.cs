using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models;
using Entities.Models.Aircrafts;

namespace Contracts
{
    public interface IBookmarkRepository : IBaseRepository<Bookmark>
    {
        Task CreateBookmarkAsync(Bookmark bookmark);

        Task<IEnumerable<Aircraft>> GetAllOwnedAircraftsAsync();
        Task<IEnumerable<Aircraft>> GetAllBookmarkedAircraftsAsync();
    }
}