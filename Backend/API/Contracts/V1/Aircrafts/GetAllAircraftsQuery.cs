namespace API.Contracts.V1.Aircrafts
{
    public class GetAllAircraftsQuery
    {
        // TODO: filters
        public string IcaoId { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string Variant { get; set; }
        public string AircraftType { get; set; }
        public string EngineType { get; set; }
        public string EngineCount { get; set; }
        public string WeightCategory { get; set; }
        public string IcaoWakeCategory { get; set; }
        public string FuelType { get; set; }
        public decimal MaxRange { get; set; }
        public string Username { get; set; }
    }
}