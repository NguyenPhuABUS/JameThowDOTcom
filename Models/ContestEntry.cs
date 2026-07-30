using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class ContestEntry
{
    public int EntryId { get; set; }

    public int? ContestId { get; set; }

    public int? UserId { get; set; }

    public int? ContentId { get; set; }

    public DateTime SubmissionDate { get; set; }

    public virtual Content? Content { get; set; }

    public virtual Contest? Contest { get; set; }

    public virtual User? User { get; set; }
}
