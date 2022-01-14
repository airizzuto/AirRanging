using Entities.Models.Enums;
using Entities.Models.Pagination;

namespace Entities.Models.Landmarks
{
    public class LandmarkParameters : QueryStringParameters
    {
        public string Name { get; set; }
        public ELandmarkType Type { get; set; }
        public string AuthorUsername { get; set; }

    }
}