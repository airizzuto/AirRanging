using System.Collections.Generic;
using AirRangingAPI.Models;

namespace AirRangingAPI.Data
{
    public interface IAirRangingDb
    {
        IEnumerable<Aircraft> GetAllAircraft();
        Aircraft GetAircraftById(int id);
    }
}