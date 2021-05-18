using API.Persistance.Contexts;

namespace API.Persistance.Repositories
{
  public abstract class BaseRepository
  {
    protected readonly AppDbContext _context;

    public BaseRepository(AppDbContext context)
    {
        _context = context;
    }
  }
}