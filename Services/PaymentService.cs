using JamesThewDOTcom.Models;

namespace JamesThewDOTcom.Services;

public interface PaymentService
{
    public Task<bool> updateSubscriptionAndSavePaymentAsync(PaymentData paymentData);
}
