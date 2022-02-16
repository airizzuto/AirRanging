using System;
using Entities.Models.Enums.Landmarks;

namespace Entities.Models.Landmarks
{
    public class Landmark : UserResourceData<Landmark>
    {
        public Guid Id { get; set; }

        public ELandmarkType Type { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public double Altitude { get; set; }
    }
}