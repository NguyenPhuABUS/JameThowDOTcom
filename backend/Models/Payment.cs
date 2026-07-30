using System;
using System.Collections.Generic;

namespace JamesThewDOTcom.Models;

public partial class Payment
{
    public int PaymentId { get; set; }

    public int? UserId { get; set; }

    public int? SubscriptionId { get; set; }

    public decimal Amount { get; set; }

    public DateTime? PaymentDate { get; set; }

    public string PaymentMethod { get; set; } = null!;

    public virtual Subscription? Subscription { get; set; }

    public virtual User? User { get; set; }
}
