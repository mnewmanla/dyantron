using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Dynatron.Models;
using Dynatron.Repository;

namespace Dynatron.Controllers
{
    [Route("api/Customers")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly CustomerDbContext _context;

        public CustomersController(CustomerDbContext context)
        {
            _context = context;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.ToListAsync();
        }

        // GET: api/Customers/00000000-0000-0000-0000-000000000001
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/00000000-0000-0000-0000-000000000001
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(Guid id, CustomerDTO dto)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            // MWN: This logic ideally would go in a logic class that encapsolates DataAccess layer instead of
            // existing in the controller, but for simplicity of this project I am adding the logic here.
            customer.LastUpdatedDateTimeUTC = DateTime.UtcNow;
            customer.Email = dto.Email;
            customer.LastName = dto.LastName;
            customer.FirstName = dto.FirstName;
            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }

            return NoContent();
        }

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(CustomerDTO dto)
        {
            // MWN : using the dto payload and domain constructor, initialize system fields, such as Id and datetime fields
            var customerToAdd = new Customer(dto.FirstName, dto.LastName, dto.Email);

            _context.Customers.Add(customerToAdd);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCustomer), new { Id = customerToAdd.Id }, customerToAdd);
        }

        // DELETE: api/Customers/00000000-0000-0000-0000-000000000001
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(Guid id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
