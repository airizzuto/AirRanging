using System.Collections.Generic;
using System.Threading.Tasks;
using Data;
using Entities.Models;
using Entities.Models.Aircrafts;
using Contracts;

namespace Repository
{
    public class BookmarkRepository 
        : BaseRepository<Bookmark>, IBookmarkRepository
    {
        public BookmarkRepository(ApplicationDbContext context) : base(context)
        {

        }

        public async Task CreateBookmarkAsync(Bookmark bookmark)
        {
            await CreateAsync(bookmark);
        }

        // TODO: Bookmark implementation
        public async Task<IEnumerable<Aircraft>> GetAllBookmarkedAircraftsAsync()
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<Aircraft>> GetAllOwnedAircraftsAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}