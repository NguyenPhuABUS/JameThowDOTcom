using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class Content
{
    public int ContentId { get; set; }

    public string? Title { get; set; }

    public string ContentType { get; set; } = null!;

    public string Content1 { get; set; } = null!;

    public string? ImageUrl { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime? UpdatedAt { get; set; }

    public bool? IsFree { get; set; }

    public int? UserId { get; set; }

    public int? CategoryId { get; set; }

    public virtual Category? Category { get; set; }

    public virtual ICollection<ContestEntry> ContestEntries { get; set; } = new List<ContestEntry>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual User? User { get; set; }
}
