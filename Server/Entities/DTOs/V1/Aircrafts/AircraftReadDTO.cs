using System;

namespace Entities.DTOs.V1.Aircrafts
{
    public class AircraftReadDTO
    {
        public Guid Id { get; set; }
        public string IcaoId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Variant { get; set; }
        public string Registration { get; set; }
        public string AircraftType { get; set; }
        public string EngineType { get; set; }
        public ushort EngineCount { get; set; }
        public string WeightCategory { get; set; }
        public string IcaoWakeCategory { get; set; }
        public string FuelType { get; set; }
        public uint MaxTakeoffWeight { get; set; }
        public uint MinRunwayLength { get; set; }
        public int CruiseSpeed { get; set; }
        public decimal FuelCapacity { get; set; }
        public decimal MaxRange { get; set; }
        public uint ServiceCeiling { get; set; }
        public int EnteredServiceAtDate { get; set; }

        public int SavesCount { get; set; }
        public string AuthorUsername { get; set; }
    }
}