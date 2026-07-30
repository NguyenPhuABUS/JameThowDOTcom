using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class User
{
    public int UserId { get; set; }

    public string Username { get; set; } = null!;

    public string Password { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string? FullName { get; set; }

    public string? AvatarUrl { get; set; }

    public virtual ICollection<Content> Contents { get; set; } = new List<Content>();

    public virtual ICollection<ContestEntry> ContestEntries { get; set; } = new List<ContestEntry>();

    public virtual ICollection<Contest> Contests { get; set; } = new List<Contest>();

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Rating> Ratings { get; set; } = new List<Rating>();

    public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();

    public virtual ICollection<Role> Roles { get; set; } = new List<Role>();
}
