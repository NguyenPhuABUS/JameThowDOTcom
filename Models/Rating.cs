using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class Rating
{
    public int RatingId { get; set; }

    public int Rating1 { get; set; }

    public DateTime? CreatedAt { get; set; }

    public int? UserId { get; set; }

    public int? ContentId { get; set; }

    public virtual Content? Content { get; set; }

    public virtual User? User { get; set; }
}
