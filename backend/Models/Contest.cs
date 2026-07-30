using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class Contest
{
    public int ContestId { get; set; }

    public string Title { get; set; } = null!;

    public string Description { get; set; } = null!;

    public DateOnly StartDate { get; set; }

    public DateOnly EndDate { get; set; }

    public int? WinnerUserId { get; set; }

    public virtual ICollection<ContestEntry> ContestEntries { get; set; } = new List<ContestEntry>();

    public virtual User? WinnerUser { get; set; }
}
