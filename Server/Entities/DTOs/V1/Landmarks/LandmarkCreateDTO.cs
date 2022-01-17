using Entities.Models.Enums;

namespace Entities.DTOs.V1.Landmarks
{
    public class LandmarkCreateDTO
    {
        public ELandmarkType Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Latitude { get; set; }
        public int Longitude { get; set; }
        public int Altitude { get; set; }
    }
}