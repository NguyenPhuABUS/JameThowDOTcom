using JamesThewDOTcom.Services;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewDOTcom.Controllers;
[Route("api/contest")]
public class ContestController : Controller
{
    private ContestService contestService;

    public ContestController(ContestService contestService)
    {
        this.contestService = contestService;
    }

    [Produces("application/json")]
    [HttpGet("findAll/{n}")]
    public IActionResult FindAll(int n)
    {
        try
        {
            return Ok(contestService.findAll(n));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("findbyId/{contestId}")]
    public IActionResult FindById(int contestId)
    {
        try
        {
            return Ok(contestService.findbyId(contestId));
        }
        catch
        { return BadRequest(); }
    }
}
