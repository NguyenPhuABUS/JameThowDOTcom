using JamesThewDOTcom.Helpers;
using JamesThewDOTcom.Models;
using JamesThewDOTcom.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace JamesThewDOTcom.Controllers;
[Route("api/content")]
public class ContentController : Controller
{
    private ContentService contentService;
    private IWebHostEnvironment webHostEnvironment;
    public ContentController(ContentService contentService, IWebHostEnvironment webHostEnvironment)
    {
        this.contentService = contentService;
        this.webHostEnvironment = webHostEnvironment;
    }
    [Produces("application/json")]
    [HttpGet("findByCategoryIdfree/{categoryId}")]
    public IActionResult FindByCategoryIdfree(int categoryId)
    {
        try
        {
            return Ok(contentService.findByCategoryIdFree(categoryId));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("findAllfree")]
    public IActionResult FindAllfree()
    {
        try
        {
            return Ok(contentService.findAllFree());
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("findByKeywordFree/{keyword}")]
    public IActionResult FindByKeywordFree(string keyword)
    {
        try
        {
            return Ok(contentService.findByKeywordFree(keyword));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("findLatetFree/{n}")]
    public IActionResult FindLatetFree(int n)
    {
        try
        {
            return Ok(contentService.findLatetFree(n));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("findContentByRole/{username}")]
    public IActionResult FindContentByRole(string username)
    {
        try
        {
            return Ok(contentService.findContentByRole(username));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("findByCategoryIdNotFree/{username}/{categoryId}")]
    public IActionResult FindByCategoryIdNotFree(string username, int categoryId)
    {
        try
        {
            return Ok(contentService.findByCategoryIdNotFree(username, categoryId));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("findByKeywordNotFree/{username}/{keyword}")]
    public IActionResult FindByKeywordNotFree(string username, string keyword)
    {
        try
        {
            return Ok(contentService.findByKeywordNotFree(username, keyword));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("findLatetNotFree/{username}/{n}")]
    public IActionResult FindLatetNotFree(string username, int n)
    {
        try
        {
            return Ok(contentService.findLatetNotFree(username, n));
        }
        catch
        { return BadRequest(); }
    }

    [Produces("application/json")]
    [HttpGet("getPagedContents")]
    public async Task<IActionResult> GetPagedContents(int page = 1, int pageSize = 10, int? categoryId = null)
    {
        var result = await contentService.GetPagedContentsAsync(page, pageSize, categoryId);
        return Ok(new
        {
            contents = result.Items,
            totalCount = result.TotalCount
        });
    }
    [Produces("application/json")]
    [HttpPost("create")]
    public IActionResult Create(IFormFile file, string sjson)
    {
        try
        {
            // Log received JSON
            Console.WriteLine("Received sjson: " + sjson);

            var setting = new JsonSerializerSettings();
            setting.Converters.Add(new IsoDateTimeConverter() { DateTimeFormat = "yyyy-MM-dd" });
            Content content = JsonConvert.DeserializeObject<Content>(sjson, setting);

            // Log deserialized content object
            Console.WriteLine("Deserialized Content: " + JsonConvert.SerializeObject(content));

            if (file == null)
            {
                content.ImageUrl = "no-image.gif";
            }
            else
            {
                var fileName = FileHelper.generateFileName(file.FileName);
                var path = Path.Combine(webHostEnvironment.WebRootPath, "images", fileName);
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(fileStream);
                }
                content.ImageUrl = fileName;
            }

            bool result = contentService.create(content);

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

    [Produces("application/json")]
    [HttpGet("recipesUser/{username}")]
    public IActionResult RecipesUser(string username)
    {
        try
        {
            return Ok(contentService.recipesUser(username));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("recipesDetails/{contentId}")]
    public IActionResult RecipesDetails(int contentId)
    {
        try
        {
            return Ok(contentService.recipesDetails(contentId));
        }
        catch
        { return BadRequest(); }
    }
    [Produces("application/json")]
    [HttpGet("getContentsByUserId/{userId}")]
    public IActionResult GetContentsByUserId(int userId)
    {
        try
        {
            return Ok(contentService.getContentsByUserId(userId));
        }
        catch
        { return BadRequest(); }
    }
}