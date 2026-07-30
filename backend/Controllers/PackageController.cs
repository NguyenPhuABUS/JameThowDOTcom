using JamesThewDOTcom.Services;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewDOTcom.Controllers;
[Route("api/package")]
public class PackageController : Controller
{
    private PackageService packageService;

    public PackageController(PackageService packageService)
    {
        this.packageService = packageService;
    }

    [Produces("application/json")]
    [HttpGet("findAll")]
    public IActionResult GetRatingsByContentId()
    {
        try
        {
            return Ok(packageService.findAll());
        }
        catch
        {
            return BadRequest();
        }
    }
}
