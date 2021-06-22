using System.Collections.Generic;
using System.Threading.Tasks;
using Contracts;
using Entities.Data;
using Entities.Models;
using Entities.Models.Aircrafts;

namespace Repository
{
    public class BookmarkRepository 
        : BaseRepository<Bookmark>, IBookmarkRepository
    {
        public BookmarkRepository(RepositoryContext context) : base(context)
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