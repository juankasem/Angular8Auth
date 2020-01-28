using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace AuthWithAngular8.Models
{
    public class ProductModel
    {
        [Key]
        public int PrtoductId { get; set; }

        [Required]
        [MaxLength(150, ErrorMessage = "Max Length is 150 characters")]
        public string Name { get; set; }

        [Required]
        [MaxLength(150, ErrorMessage = "Max Length is 150 characters")]
        public string Description { get; set; }

        [Required]
        public bool OutOfStock { get; set; }

        [Required]
        public string ImageUrl { get; set; }

        [Required]
        public double Price { get; set; }
    }
}
