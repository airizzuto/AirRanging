using System.Threading.Tasks;

namespace API.Data.Repositories
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}