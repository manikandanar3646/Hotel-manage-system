using hotel_management_system.data;
using hotel_management_system.models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace hotel_management_system.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactMessagesController : ControllerBase
    {
        private readonly HotelDbContext _context;

        public ContactMessagesController(HotelDbContext context)
        {
            _context = context;
        }

        // GET: api/ContactMessages
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactMessage>>> GetContactMessages()
        {
            return await _context.ContactMessages.ToListAsync();
        }

        // GET: api/ContactMessages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ContactMessage>> GetContactMessage(int id)
        {
            var message = await _context.ContactMessages.FindAsync(id);

            if (message == null)
            {
                return NotFound("Message not found.");
            }

            return message;
        }

        // POST: api/ContactMessages
        [HttpPost]
        public async Task<ActionResult<ContactMessage>> CreateContactMessage(ContactMessage message)
        {
            message.CreatedAt = DateTime.Now;

            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContactMessage),
                new { id = message.MessageId }, message);
        }

        // PUT: api/ContactMessages/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContactMessage(int id, ContactMessage message)
        {
            if (id != message.MessageId)
            {
                return BadRequest("Message ID mismatch.");
            }

            _context.Entry(message).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactMessageExists(id))
                {
                    return NotFound("Message not found.");
                }

                throw;
            }

            return NoContent();
        }

        // DELETE: api/ContactMessages/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContactMessage(int id)
        {
            var message = await _context.ContactMessages.FindAsync(id);

            if (message == null)
            {
                return NotFound("Message not found.");
            }

            _context.ContactMessages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactMessageExists(int id)
        {
            return _context.ContactMessages.Any(e => e.MessageId == id);
        }
    }
}