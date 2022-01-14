using System.Collections.Generic;
using Entities.Models.Aircrafts;

namespace Entities.Helpers.Aircrafts
{
    public interface IAircraftsFilterHelper
    {
        IEnumerable<Aircraft> ApplyFilter(IEnumerable<Aircraft> aircrafts, AircraftParameters parameters);
    }
}