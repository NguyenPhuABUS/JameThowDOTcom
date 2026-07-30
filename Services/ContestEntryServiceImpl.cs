using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public class ContestEntryServiceImpl : ContestEntryService
{
    private DatabaseContext db;
    private IConfiguration configuration;

    public ContestEntryServiceImpl(DatabaseContext db, IConfiguration configuration)
    {
        this.db = db;
        this.configuration = configuration;
    }

    public bool create(ContestEntry contestEntry)
    {
        try
        {
            db.ContestEntries.Add(contestEntry);
            return db.SaveChanges() > 0;
        }
        catch { return false; }
    }

    public dynamic findBycontentId(int contestId)
    {
        return db.ContestEntries.Where(c => c.ContestId == contestId).Select(c => new
        {
            contentId = c.ContentId,
            contentTitle = c.Content.Title,
            contentImage = configuration["ImageUrl"] + c.Content.ImageUrl,
            contentCreated = c.Content.CreatedAt.ToString("dd/MM/yyyy")
        }).ToList();
    }

    public dynamic findBycontestId(int contestId)
    {
        return db.ContestEntries.Where(c => c.ContestId == contestId).Select(c => new
        {
            entryId = c.EntryId,
            contestId = c.ContestId,
            userId = c.UserId,
            submissionDate = c.SubmissionDate.ToString("dd/MM/yyyy"),
            contestTitle = c.Contest.Title,
            contestDescription = c.Contest.Description,
            contestStartDate = c.Contest.StartDate.ToString("dd/MM/yyyy"),
            contestEndDate = c.Contest.EndDate.ToString("dd/MM/yyyy"),
            WinnerUser = c.User.Username,
        }).FirstOrDefault();
    }
}


