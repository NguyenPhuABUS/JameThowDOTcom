using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class Announcement
{
    public int AnnouncementId { get; set; }

    public string Content { get; set; } = null!;

    public DateTime? CreatedAt { get; set; }
}
