using API.Models.Enums;
using API.Models.Identity;

namespace API.Models.Filters
{
    public class GetAllAircraftsFilter
    {
        // TODO: filters
        public string IcaoId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Variant { get; set; }
        public EAircraftType AircraftType { get; set; }
        public EEngineType EngineType { get; set; }
        public EWeightCategory WeightCategory { get; set; }
        public EIcaoWakeCategory IcaoWakeCategory { get; set; }
        public EFuelType FuelType { get; set; }
        public int EngineCount { get; set; }
        public decimal MaxRange { get; set; }
        public string AuthorUsername { get; set; }
    }
}