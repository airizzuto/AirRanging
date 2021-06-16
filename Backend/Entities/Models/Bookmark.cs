using System;
using API.Models.Identity;

namespace API.Models
{
    public class Bookmark
    {
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public Guid AircraftId { get; set; }
        public Aircraft Aircraft { get; set; }
    }
}