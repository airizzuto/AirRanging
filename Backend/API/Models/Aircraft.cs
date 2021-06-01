using System.ComponentModel.DataAnnotations;
using API.Models.Enums;

namespace API.Models
{
    public class Aircraft
    {
        public int Id { get; set; }
        // FK userid
        public string IcaoId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Variant { get; set; }
        public string Registration { get; set; }
        public EAircraftType AircraftType { get; set; }
        public EEngineType EngineType { get; set; }
        public short EngineCount { get; set; }
        public EWeightCategory WeightCategory { get; set; }
        public EIcaoWakeCategory IcaoWakeCategory { get; set; }
        public EFuelType FuelType { get; set; }
        public int MaxTakeoffWeight { get; set; }
        // RequiredRunwayLength int { get; set; }
        public int CruiseSpeed { get; set; }
        public decimal FuelCapacity { get; set; }
        // TODO: Convert Fuel Weight <-> Volume
        public decimal MaxRange { get; set; }
        public int ServiceCeiling { get; set; }

        // public User CreatedBy { get; set; }
        // public List<User> UsersSaved { get; set; }
    }
}