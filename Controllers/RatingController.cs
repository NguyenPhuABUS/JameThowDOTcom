using JamesThewDOTcom.Models;
using JamesThewDOTcom.Services;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace JamesThewDOTcom.Controllers
{
    [Route("api/rating")]
    public class RatingController : Controller
    {
        private RatingService ratingService;

        public RatingController(RatingService ratingService)
        {
            this.ratingService = ratingService;
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
                Rating rating = JsonConvert.DeserializeObject<Rating>(sjson, setting);

                // Log deserialized content object
                Console.WriteLine("Deserialized Content: " + JsonConvert.SerializeObject(rating));

                bool result = ratingService.create(rating);

                return Ok(new
                {
                    Result = rating.RatingId,
                    //Result = result,
                    //ratingId = rating.RatingId
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
        [HttpGet("content/{contentId}/{n}")]
        public IActionResult GetRatingsByContentId(int contentId, int n)
        {
            try
            {
                return Ok(ratingService.getRatingsByContentId(contentId,n));
            }
            catch
            {
                return BadRequest();
            }
        }

        [Produces("application/json")]
        [HttpGet("average/{contentId}")]
        public IActionResult GetAverageRatingByContentId(int contentId)
        {
            try
            {
                var averageRating = ratingService.getAverageRatingByContentId(contentId);
                return Ok(new { average = averageRating });
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
