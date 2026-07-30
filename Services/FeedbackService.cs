using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public interface FeedbackService
{
    public bool create(Feedback feedback);
    public dynamic findlatetFeedback(int contentId,int n);
}
