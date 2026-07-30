using JamesThewDOTcom.Models;
using Microsoft.EntityFrameworkCore;

namespace JamesThewDOTcom.Services;

public class PaymentServiceImpl : PaymentService
{
    private DatabaseContext db;

    public PaymentServiceImpl(DatabaseContext db)
    {
        this.db = db;
    }

    public async Task<bool> updateSubscriptionAndSavePaymentAsync(PaymentData paymentData)
    {
        try
        {
            var user = await db.Users
                .Include(u => u.Roles)
                .Include(u => u.Subscriptions)
                .SingleOrDefaultAsync(u => u.Username == paymentData.Username);

            if (user == null)
            {
                return false;
            }

            // Determine subscription type and duration
            var package = await db.Packages.SingleOrDefaultAsync(p => p.PackageId == paymentData.PackageId);
            if (package == null)
            {
                throw new Exception("Invalid package ID");
            }

            // Update or create user subscription
            var subscription = user.Subscriptions.FirstOrDefault(s => s.Type == package.PackageName);
            if (subscription == null)
            {
                subscription = new Subscription
                {
                    UserId = user.UserId,
                    Type = package.PackageName,
                    StartDate = DateTime.UtcNow,
                    EndDate = DateTime.UtcNow.AddMonths(package.DurationMonths),
                    Status = "Active",
                    PackageId = package.PackageId
                };
                db.Subscriptions.Add(subscription);
            }
            else
            {
                subscription.EndDate = subscription.EndDate.AddMonths(package.DurationMonths);
                subscription.Status = "Active";
            }

            // Save payment method
            var payment = new Payment
            {
                UserId = user.UserId,
                Subscription = subscription,
                Amount = paymentData.Amount,
                PaymentMethod = paymentData.PaymentMethod,
                PaymentDate = DateTime.UtcNow
            };
            db.Payments.Add(payment);

            // Update user role to "User Super"
            var superUserRole = await db.Roles.SingleOrDefaultAsync(r => r.RoleName == "User Super");
            if (superUserRole != null && !user.Roles.Any(r => r.RoleName == "User Super"))
            {
                user.Roles.Add(superUserRole);
            }

            await db.SaveChangesAsync();
            return true;
        }
        catch (Exception ex)
        {
            // Log the exception details
            Console.WriteLine("Exception: " + ex.Message);
            if (ex.InnerException != null)
            {
                Console.WriteLine("Inner Exception: " + ex.InnerException.Message);
            }
            throw;
        }
    }
}



