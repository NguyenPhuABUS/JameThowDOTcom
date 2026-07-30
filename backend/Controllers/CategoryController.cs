using JamesThewDOTcom.Services;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewDOTcom.Controllers;
[Route("api/category")]
public class CategoryController : Controller
{
    private CategoryService categoryService;

    public CategoryController(CategoryService categoryService)
    {
        this.categoryService = categoryService;
    }
    [Produces("application/json")]
    [HttpGet("findAll")]
    public IActionResult FindAll()
    {
        try
        {
            return Ok(categoryService.findAll());
        }
        catch
        { return BadRequest(); }
    }
}
