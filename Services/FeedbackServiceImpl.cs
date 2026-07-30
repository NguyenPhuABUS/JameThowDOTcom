using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public class FeedbackServiceImpl : FeedbackService
{
    private DatabaseContext db;
    private IConfiguration configuration;
    public FeedbackServiceImpl(DatabaseContext db, IConfiguration configuration)
    {
        this.db = db;
        this.configuration = configuration;
    }
    public bool create(Feedback feedback)
    {
        try
        {
            db.Feedbacks.Add(feedback);
            return db.SaveChanges() > 0;
        }
        catch { return false; }
    }

    public dynamic findlatetFeedback(int contentId,int n)
    {
        return db.Feedbacks.Where(f => f.ContentId == contentId).OrderByDescending(f => f.FeedbackId).Take(n).Select(f => new {
            feedbackId = f.FeedbackId,
            content = f.Content,
            createdAt = f.CreatedAt.ToString("dd/MM/yyyy"),
            userAvarta = configuration["ImageUrl"] + f.User.AvatarUrl,
            username = f.User.Username,
        }).ToList();
    }
}