using System;
using Entities.Models.Aircrafts;
using Entities.Models.Identity;

namespace Entities.Models
{
    public class Bookmark
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid AircraftId { get; set; }
        public Aircraft Aircraft { get; set; }
    }
}