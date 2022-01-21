using System.Collections.Generic;
using Entities.Models.Enums;
using Entities.Models.Enums.Landmarks;

namespace Entities.Models.Landmarks
{
    public class LandmarkAirstrip : Landmark
    {
        public string IataId { get; set; }
        public string IcaoId { get; set; }
        public bool IsNightOperable { get; set; }
        public bool IsControlled { get; set; }
        public EAirportUse AirportUse { get; set; }

        // public List<EAirportServices> Services { get; set; }
        public List<EFuelType> FuelAvailable { get; set; }
        public List<Runway> Runways { get; set; }
    }
}