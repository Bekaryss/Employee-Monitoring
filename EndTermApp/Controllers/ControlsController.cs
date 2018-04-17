using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EndTermApp.Data;
using EndTermApp.Models;

namespace EndTermApp.Controllers
{
    [Produces("application/json")]
    [Route("api/Controls")]
    public class ControlsController : Controller
    {
        private readonly MyContext _context;

        public ControlsController(MyContext context)
        {
            _context = context;
        }

        // GET: api/Controls
        [HttpGet]
        public IEnumerable<Control> GetControls()
        {
            var item = _context.Controls.Include(p => p.Employee).ToList();
            return _context.Controls.ToList();
        }

        // GET: api/Controls/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetControl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var control = await _context.Controls.Include(c => c.Employee).SingleOrDefaultAsync(m => m.Id == id);

            if (control == null)
            {
                return NotFound();
            }

            return Ok(control);
        }

        // PUT: api/Controls/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutControl([FromRoute] int id, [FromBody] Control control)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != control.Id)
            {
                return BadRequest();
            }

            _context.Entry(control).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ControlExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Controls
        [HttpPost]
        public async Task<IActionResult> PostControl([FromBody] Control control)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Controls.Add(control);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetControl", new { id = control.Id }, control);
        }

        // DELETE: api/Controls/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteControl([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var control = await _context.Controls.SingleOrDefaultAsync(m => m.Id == id);
            if (control == null)
            {
                return NotFound();
            }

            _context.Controls.Remove(control);
            await _context.SaveChangesAsync();

            return Ok(control);
        }

        private bool ControlExists(int id)
        {
            return _context.Controls.Any(e => e.Id == id);
        }
    }
}