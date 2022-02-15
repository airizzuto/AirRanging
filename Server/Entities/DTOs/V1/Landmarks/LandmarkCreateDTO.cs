using Entities.Models.Enums.Landmarks;

namespace Entities.DTOs.V1.Landmarks
{
    public class LandmarkCreateDTO
    {
        public ELandmarkType Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }
    }
}