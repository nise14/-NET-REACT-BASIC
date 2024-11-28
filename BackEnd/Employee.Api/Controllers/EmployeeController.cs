using Employee.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Employee.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EmployeeController(DbcrudContext context) : ControllerBase
{
    private readonly DbcrudContext _context = context;

    [HttpGet]
    [Route("Get")]
    public async Task<IActionResult> Get()
    {
        var employees = await _context.Emploees.ToListAsync();
        return StatusCode(StatusCodes.Status200OK, employees);
    }

    [HttpGet]
    [Route("Get/{id:int}")]
    public async Task<IActionResult> Get(int id)
    {
        var employee = await _context.Emploees.FirstOrDefaultAsync(x => x.IdEmployee == id);
        return StatusCode(StatusCodes.Status200OK, employee);
    }

    [HttpPost]
    [Route("New")]
    public async Task<IActionResult> Post([FromBody] Emploee emploee)
    {
        await _context.Emploees.AddAsync(emploee);
        await _context.SaveChangesAsync();

        return StatusCode(StatusCodes.Status200OK, new { Message = "Ok" });
    }

    [HttpPut]
    [Route("Edit")]
    public async Task<IActionResult> Put([FromBody] Emploee emploee)
    {
        _context.Emploees.Update(emploee);
        await _context.SaveChangesAsync();

        return StatusCode(StatusCodes.Status200OK, new { Message = "Ok" });
    }

    [HttpDelete]
    [Route("Delete/{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var employee = await _context.Emploees.FirstOrDefaultAsync(x => x.IdEmployee == id);
        if (employee == null)
        {
            return NotFound();
        }

        _context.Emploees.Remove(employee);
        await _context.SaveChangesAsync();
        return StatusCode(StatusCodes.Status200OK, employee);
    }
}