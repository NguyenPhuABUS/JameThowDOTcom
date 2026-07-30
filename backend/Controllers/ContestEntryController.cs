using JamesThewDOTcom.Helpers;
using JamesThewDOTcom.Models;
using JamesThewDOTcom.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace JamesThewDOTcom.Controllers;
[Route("api/contestEntry")]
public class ContestEntryController : Controller
{
    private ContestEntryService contestEntryService;

    public ContestEntryController(ContestEntryService contestEntryService)
    {
        this.contestEntryService = contestEntryService;
    }

    [Produces("application/json")]
    [HttpGet("findBycontestId/{contestId}")]
    public IActionResult FindBycontestId(int contestId)
    {
        try
        {
            return Ok(contestEntryService.findBycontestId(contestId));
        }
        catch
        { return BadRequest(); }
    }

    [Produces("application/json")]
    [HttpGet("findBycontentId/{contestId}")]
    public IActionResult FindBycontentId(int contestId)
    {
        try
        {
            return Ok(contestEntryService.findBycontentId(contestId));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpPost("create")]
    public IActionResult Create(string sjson)
    {
        try
        {
            // Log received JSON
            Console.WriteLine("Received sjson: " + sjson);

            var setting = new JsonSerializerSettings();
            setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "yyyy-MM-dd" });
            ContestEntry contestEntry = JsonConvert.DeserializeObject<ContestEntry>(sjson, setting);

            // Log deserialized content object
            Console.WriteLine("Deserialized Content: " + JsonConvert.SerializeObject(contestEntry));

            
            bool result = contestEntryService.create(contestEntry);

            return Ok(new
            {
                Result = result
            });
        }
        catch (Exception ex)
        {
            // Log exception for debugging
            Console.WriteLine("Exception: " + ex.Message);
            return BadRequest();
        }
    }
}
