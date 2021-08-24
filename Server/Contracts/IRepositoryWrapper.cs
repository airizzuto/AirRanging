using System.Threading.Tasks;
using Contracts.Aircrafts;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IAircraftRepository Aircraft { get; }
        IApplicationUserRepository ApplicationUser { get; }
        IBookmarkRepository Bookmark { get; }
        Task SaveAsync();
    }
}