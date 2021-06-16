using System.Threading.Tasks;

namespace Repositories
{
    public interface IUnitOfWork
    {
        IAircraftRepository Aircraft { get; }
        Task SaveAsync();
    }
}