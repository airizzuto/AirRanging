using System.Threading.Tasks;
using Contracts.Aircrafts;
using Contracts.Landmarks;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IAircraftRepository Aircraft { get; }
        ILandmarkRepository Landmark { get; }
        IApplicationUserRepository ApplicationUser { get; }
        IBookmarkRepository Bookmark { get; }
        Task SaveAsync();
    }
}