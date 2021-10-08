using System;
using Entities.Models.Enums;
using Entities.Models.Pagination;

namespace Entities.Models.Aircrafts
{
    /// <summary>
    /// Aircrafts parameters used in search queries
    /// </summary>
    public class AircraftParameters : QueryStringParameters
    {
        public string IcaoId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set;}
        public string Variant { get; set; }
        public EAircraftType AircraftType { get; set; }
        public EEngineType EngineType { get; set; }
        public ushort EngineCount { get; set; }
        public EWeightCategory WeightCategory { get; set; }
        public EFuelType FuelType { get; set; }
        public uint MaxTakeoffWeight { get; set; }
        public uint MinRunwayLength { get; set; }
        public int CruiseSpeed { get; set; }
        public uint MaxRange { get; set; }
        public uint ServiceCeiling { get; set; }
        public int EnteredServiceAtDate { get; set; }
        public string AuthorUsername { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}