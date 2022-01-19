using System.Threading.Tasks;
using Contracts.Aircrafts;
using Contracts.Landmarks;
using Entities.Models.Aircrafts;
using Entities.Models.Landmarks;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IAircraftRepository Aircraft { get; }
        ILandmarkRepository Landmark { get; }
        IApplicationUserRepository ApplicationUser { get; }
        IBookmarkRepository<Aircraft> AircraftBookmark { get; }
        IBookmarkRepository<Landmark> LandmarkBookmark { get; }
        Task SaveAsync();
    }
}