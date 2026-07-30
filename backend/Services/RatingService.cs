using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public interface RatingService
{
    public dynamic getRatingsByContentId(int contentId, int n);
    public double getAverageRatingByContentId(int contentId);
    public bool create(Rating rating);
}
