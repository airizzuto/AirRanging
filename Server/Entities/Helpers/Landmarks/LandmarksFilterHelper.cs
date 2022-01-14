using System.Collections.Generic;
using System.Linq;
using Entities.Models.Landmarks;

namespace Entities.Helpers.Landmarks
{
    public class LandmarksFilterHelper : ILandmarksFilterHelper
    {
        public IEnumerable<Landmark> ApplyFilter(IEnumerable<Landmark> landmarks, LandmarkParameters parameters)
        {
            var filteredLandmarks = landmarks;

            FilterByIcaoId(ref filteredLandmarks, parameters.Name);
            // TODO: additional filters

            return filteredLandmarks;
        }

        private static void FilterByIcaoId(ref IEnumerable<Landmark> landmarks, string name)
        {
            if (!landmarks.Any() || string.IsNullOrWhiteSpace(name)) return;

            landmarks = landmarks.Where(
                l => l.Name.ToUpper().Contains(name.Trim().ToUpper())
            );
        }
    }
}