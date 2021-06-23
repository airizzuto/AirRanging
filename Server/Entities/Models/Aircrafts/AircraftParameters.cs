using Entities.Models.Enums;
using Entities.Models.Pagination;

namespace Entities.Models.Aircrafts
{
    public class AircraftParameters : QueryStringParameters
    {
        public string IcaoId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set;}
        public string Variant { get; set; }
        public EAircraftType AircraftType { get; set; }
        public EEngineType EngineType { get; set; }
        public EFuelType FuelType { get; set; }
        public EWeightCategory WeightCategory { get; set; }
        public uint EngineCount { get; set; }
        public uint MaxRange { get; set; }
        public string AuthorUsername { get; set; }
    }
}