using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class Subscription
{
    public int SubscriptionId { get; set; }

    public int? UserId { get; set; }

    public string Type { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public string? Status { get; set; }

    public int? PackageId { get; set; }

    public virtual Package? Package { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual User? User { get; set; }
}
