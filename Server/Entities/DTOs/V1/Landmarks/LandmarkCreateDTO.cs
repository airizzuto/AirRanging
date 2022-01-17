using Entities.Models.Enums;

namespace Entities.DTOs.V1.Landmarks
{
    public class LandmarkCreateDTO
    {
        public ELandmarkType Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public float Altitude { get; set; }
    }
}