using System.Collections.Generic;
using System.Threading.Tasks;
using Entities.Models.Landmarks;
using Entities.Models.Pagination;

namespace Contracts.Landmarks
{
    public interface ILandmarkRepository : IBaseRepository<Landmark>
    {
        Task<IEnumerable<Landmark>> GetAllLandmarksAsync();

        Task<IEnumerable<Landmark>> GetLandmarksOwnedAsync(string userId);

        Task<Landmark> GetLandmarkByIdAsync(string id);

        Task<Landmark> CreateLandmarkAsync(Landmark landmark, string userId);

        void UpdateLandmark(Landmark landmark);

        void DeleteLandmark(Landmark landmark);

        Landmark CountLandmarkSaved(Landmark landmark);
        Landmark CountLandmarkUnsaved(Landmark landmark);
        IEnumerable<Landmark> FilterLandmarks(IEnumerable<Landmark> landmarks, LandmarkParameters parameters);
        IEnumerable<Landmark> SortLandmarks(IEnumerable<Landmark> landmarks, LandmarkParameters parameters);
        PagedList<Landmark> PaginatedLandmarks(IEnumerable<Landmark> landmarks, LandmarkParameters parameters);
    }
}