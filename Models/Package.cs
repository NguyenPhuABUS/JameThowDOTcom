using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class Package
{
    public int PackageId { get; set; }

    public string PackageName { get; set; } = null!;

    public decimal Price { get; set; }

    public string? Description { get; set; }

    public int DurationMonths { get; set; }

    public virtual ICollection<Subscription> Subscriptions { get; set; } = new List<Subscription>();
}
