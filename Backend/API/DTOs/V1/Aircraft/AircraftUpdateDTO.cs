using System;
using API.Models.Enums;

namespace API.DTOs.V1.Aircraft
{
    public class AircraftUpdateDTO
    {
        public Guid Id { get; set; }
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
        public int CruiseSpeed { get; set; }
        public decimal FuelCapacity { get; set; }
        public decimal MaxRange { get; set; }
        public int ServiceCeiling { get; set; }
        public int SavesCount { get; set; }

        public string UserId { get; set; }
        public string Username { get; set; } // TODO: Check if needed
    }
}