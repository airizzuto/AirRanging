using System.Collections.Generic;
using Entities.Models.Landmarks;

namespace Entities.Helpers.Landmarks
{
    public interface ILandmarksFilterHelper
    {
        IEnumerable<Landmark> ApplyFilter(IEnumerable<Landmark> landmarks, LandmarkParameters parameters);
    }
}