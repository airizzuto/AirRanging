using System;
using Entities.Models.Aircrafts;
using Entities.Models.Identity;

namespace Entities.Models.Bookmarks
{
    public class Bookmark
    {
        // TODO: make generic to also accept landmark models
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid AircraftId { get; set; }
        public Aircraft Aircraft { get; set; }
    }
}