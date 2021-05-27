using System.Threading.Tasks;
using API.Data.Contexts;

namespace API.Data.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly AppDbContext _context;
        readonly IUnitOfWork _unitOfWork;

        public BaseRepository(AppDbContext context)
        {
            _context = context;
            _unitOfWork = new UnitOfWork(_context);
        }

        public async Task SaveChangesAsync()
        {
            await _unitOfWork.CompleteAsync();
        }
    }
}