using JamesThewDOTcom.Models;
using JamesThewDOTcom.Services;
using Microsoft.AspNetCore.Mvc;

namespace JamesThewDOTcom.Controllers;
[Route("api/payment")]
public class PaymentController : Controller
{
    private PaymentService paymentService;

    public PaymentController(PaymentService paymentService)
    {
        this.paymentService = paymentService;
    }

    [Consumes("multipart/form-data")]
    [Produces("application/json")]
    [HttpPost("UpdateSubscriptionAndSavePayment")]
    public async Task<IActionResult> UpdateSubscriptionAndSavePaymentAsync([FromForm] PaymentData paymentData)
    {
        if (paymentData == null)
        {
            return BadRequest("Invalid payment data");
        }

        try
        {
            var result = await paymentService.updateSubscriptionAndSavePaymentAsync(paymentData);
            if (!result)
            {
                return NotFound("User not found");
            }

            return Ok(new { message = "Payment saved and subscription updated successfully" });
        }
        catch (Exception ex)
        {
            // Log the exception details
            Console.WriteLine("Exception: " + ex.Message);
            if (ex.InnerException != null)
            {
                Console.WriteLine("Inner Exception: " + ex.InnerException.Message);
            }
            return StatusCode(500, new { message = "An error occurred while processing the request", details = ex.Message });
        }
    }

}
