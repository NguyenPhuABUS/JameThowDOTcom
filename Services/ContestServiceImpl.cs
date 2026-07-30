using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public class ContestServiceImpl : ContestService
{
    private DatabaseContext db;

    public ContestServiceImpl(DatabaseContext db)
    {
        this.db = db;
    }
    public dynamic findAll(int n)
    {
        return db.Contests.OrderByDescending(c => c.ContestId).Take(n).Select(c => new
        {
            contestId = c.ContestId,
            title = c.Title,
            description = c.Description,
            startDate = c.StartDate.ToString("dd/MM/yyyy"),
            endDate = c.EndDate.ToString("dd/MM/yyyy"),
            winnerUserId = c.WinnerUser.Username,
        }).ToList();
    }

    public dynamic findbyId(int contestId)
    {
        return db.Contests.Where(c => c.ContestId == contestId).Select(c => new
        {
            contestId = c.ContestId,
            title = c.Title,
            description = c.Description,
            startDate = c.StartDate.ToString("dd/MM/yyyy"),
            endDate = c.EndDate.ToString("dd/MM/yyyy"),
            winnerUserId = c.WinnerUser.Username,
        }).FirstOrDefault();
    }
}
