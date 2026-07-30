using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public interface ContestEntryService
{
    public dynamic findBycontestId(int contestId);
    public dynamic findBycontentId(int contestId);
    public bool create(ContestEntry contestEntry);
}
