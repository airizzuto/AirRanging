using System.Threading.Tasks;
using Contracts.Aircrafts;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IAircraftRepository Aircraft { get; }
        // IApplicationUserService ApplicationUser { get; }
        IBookmarkRepository Bookmark { get; }
        Task SaveAsync();
    }
}