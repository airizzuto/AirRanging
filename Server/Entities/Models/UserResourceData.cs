using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Entities.Models.Bookmarks;
using Entities.Models.Identity;

namespace Entities.Models
{
    public class UserResourceData<T>
    {
        
        [Display(Name = "Image URL")]
        public string ImageUrl { get; set; }

        [Display(Name = "Created At Date")]
        public DateTime CreatedDate { get; set; }

        [Display(Name = "Modified At Date")]
        public DateTime ModifiedDate { get; set; }

        [Display(Name = "Saves Count")]
        public uint SavesCount { get; set; }

        [Display(Name = "Author Username")]
        public string AuthorUsername { get; set; }

        // Navigation properties
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public ICollection<Bookmark<T>> Bookmarks { get; set; }
    }
}