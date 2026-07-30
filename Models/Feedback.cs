using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class Feedback
{
    public int FeedbackId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime CreatedAt { get; set; }

    public int? UserId { get; set; }

    public int? ContentId { get; set; }

    public virtual Content? ContentNavigation { get; set; }

    public virtual User? User { get; set; }
}
