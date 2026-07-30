namespace JamesThewDOTcom.Models;

public class PaymentData
{
    public string Username { get; set; }
    public decimal Amount { get; set; }
    public string PaymentMethod { get; set; }
    public int PackageId { get; set; }
}
