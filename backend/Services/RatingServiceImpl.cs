using JamesThewDOTcom.Models;
using Microsoft.EntityFrameworkCore;

namespace JamesThewDOTcom.Services;

public class RatingServiceImpl : RatingService
{
    private DatabaseContext db;
    private IConfiguration configuration;

    public RatingServiceImpl(DatabaseContext db, IConfiguration configuration)
    {
        this.db = db;
        this.configuration = configuration;
    }
    public dynamic getRatingsByContentId(int contentId, int n)
    {
        return db.Ratings.Where(r => r.ContentId == contentId).OrderByDescending(r => r.RatingId).Take(n).Select(r => new
        {
            ratingId = r.RatingId,
            username = r.User.Username,
            rating = r.Rating1,

        }).ToList();
    }

    public double getAverageRatingByContentId(int contentId)
    {
        var ratings = db.Set<Rating>().Where(r => r.ContentId == contentId).ToList();
        if (ratings.Count == 0) return 0;
        return ratings.Average(r => r.Rating1);
    }
    public bool create(Rating rating)
    {
        try
        {
            db.Ratings.Add(rating);
            return db.SaveChanges() > 0;
        }
        catch { return false; }
    }

}
