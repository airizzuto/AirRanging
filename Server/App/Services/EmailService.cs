using System.Threading.Tasks;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Identity;
using Constants;
using Contracts;
using Emailer;
using Entities.Models.Identity;

namespace App.Services
{
    public class EmailService : IEmailService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly IDataProtector _protector;
        private readonly IEmailSender _emailSender;

        public EmailService(
            UserManager<ApplicationUser> userManager,
            IDataProtector protector,
            IEmailSender emailSender)
        {
            _userManager = userManager;
            _protector = protector;
            _emailSender = emailSender;
        }

        // TODO: make one function
        // public async Task SendEmailConfirmation(ApplicationUser user)
        // {
        //     // TODO: confirmation page
        //     var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
        //     var email = _protector.Protect(user.Email);

        //     var resetLink = Path.Client.Port + $"/confirmation?token={token}&email={email}";
        //     var content = EmailConfirmationContent(resetLink);

        //     var message = new Message(
        //         new string[] { user.Email },
        //         "Reset password for AirRanging",
        //         content,
        //         null
        //     );

        //     await _emailSender.SendEmailAsync(message);
        // }

        public async Task SendPasswordReset(ApplicationUser user)
        {
            // TODO: error handling?
            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var email = _protector.Protect(user.Email);

            var resetLink = Path.Client.Port + $"/reset?token={token}&email={email}";
            var content = PasswordResetContent(resetLink);

            var message = new Message(
                new string[] { user.Email },
                "Reset password for AirRanging",
                content,
                null
            );

            await _emailSender.SendEmailAsync(message);
        }

        public static string EmailConfirmationContent(string confirmationLink)
        {
            // TODO: Styling, better html
            return string.Concat(
                $"<h1>Hello from AirRangingApp!</h1>",
                $"<div>",
                $"<p>Verify your email</p>",
                $"<p>Click link below to confirm your email address.</p>",
                $"<a href=\"{confirmationLink}\">{confirmationLink}</a>",
                $"</div>",
                $"<br />",
                $"<div>",
                $"<p>If you have not requested this email, it is safe to delete it.</p>",
                $"</div>",
                $"<br />",
                $"<p>Air Ranging App</p>"
            );
        }

        private static string PasswordResetContent(string confirmationLink)
        {
            // TODO: Styling, better html
            return string.Concat(
                $"<h1>Hello from AirRangingApp!</h1>",
                $"<div>",
                $"<p>Reset password</p>",
                $"<p>Click button below to go to password reset page.</p>",
                $"<a href=\"{confirmationLink}\">{confirmationLink}</a>",
                $"</div>",
                $"<br />",
                $"<div>",
                $"<p>If you have not requested this email, you can contact support at airrangingapp@gmail.com.</p>",
                $"</div>",
                $"<br />",
                $"<p>Air Ranging App</p>"
            );
        }
    }
}