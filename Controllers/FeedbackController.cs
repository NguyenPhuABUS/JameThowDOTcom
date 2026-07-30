using JamesThewDOTcom.Helpers;
using JamesThewDOTcom.Models;
using JamesThewDOTcom.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace JamesThewDOTcom.Controllers;
[Route("api/feedback")]
public class FeedbackController : Controller
{
    private FeedbackService feedbackService;

    public FeedbackController(FeedbackService feedbackService)
    {
        this.feedbackService = feedbackService;
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
            Feedback feedback = JsonConvert.DeserializeObject<Feedback>(sjson, setting);

            // Log deserialized content object
            Console.WriteLine("Deserialized Content: " + JsonConvert.SerializeObject(feedback));
            
            bool result = feedbackService.create(feedback);

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
    [HttpGet("findlatetFeedback/{contentId}/{n}")]
    public IActionResult FindlatetFeedback(int contentId,int n)
    {
        try
        {
            return Ok(feedbackService.findlatetFeedback(contentId, n));
        }
        catch
        { return BadRequest(); }
    }
}
