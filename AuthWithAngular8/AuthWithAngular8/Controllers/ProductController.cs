using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuthWithAngular8.Data;
using AuthWithAngular8.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuthWithAngular8.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly ApplicationDbContext _db;

        public ProductController(ApplicationDbContext db)
        {
            _db = db;
        }

        [HttpGet("[action]")]
        [Authorize(Policy = "RequireLoggedIn")]
        public IActionResult GetProducts()
        {
            return Ok(_db.Products.ToList());
        }

        [HttpGet("[action]/{id}")]
        public IActionResult Get()
        {
            return Ok(_db.Products.ToList());
        }

        [HttpPost("[action]")]
        [Authorize(Policy = "RequireAdministrator")]
        public async Task<IActionResult> AddProductAsync([FromBody] ProductModel formData)
        {
            var newProduct = new ProductModel()
            {
                Name = formData.Name,
                Description = formData.Description,
                OutOfStock = formData.OutOfStock,
                ImageUrl = formData.ImageUrl,
                Price = formData.Price
            };

            await _db.AddAsync(newProduct);
            await _db.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("[action]/{id}")]
        [Authorize(Policy = "RequireAdministrator")]
        public async Task<IActionResult> UpdateProductAsync([FromRoute] int id, [FromBody] ProductModel formData)
        {
            if (ModelState.IsValid)
            {
                var product = await _db.Products.FindAsync(id);

                if (product == null)
                {
                    return NotFound();
                }

                product.Name = formData.Name;
                product.Description = formData.Description;
                product.OutOfStock = formData.OutOfStock;
                product.ImageUrl = formData.ImageUrl;
                product.Price = formData.Price;

                _db.Entry(product).State = EntityState.Modified;
                await _db.SaveChangesAsync();

                return Ok(new JsonResult("The product of the Id " + id + "is updated"));
            }

            return BadRequest(ModelState);
        }

        [HttpPut("[action]")]
        [Authorize(Policy = "RequireAdministrator")]
        public async Task<IActionResult> DeleteProductAsync([FromRoute] int id)
        {
            var product = await _db.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound();
            }

            _db.Products.Remove(product);
            await _db.SaveChangesAsync();

            return Ok(new JsonResult("The product of the Id " + id + "is deleted"));
        }
    }
}