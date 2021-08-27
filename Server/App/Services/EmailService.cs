namespace App.Services
{
    public static class EmailService
    {
        public static string EmailConfirmationContent(string confirmationLink)
        {
            // TODO: Styling, better html
            return string.Concat(
                $"<h1>Hello from AirRangingApp!</h1>",
                $"<div>",
                $"<p>Verify your email</p>",
                $"<p>Click button below to confirm your email address.</p>",
                $"<a href=\"{confirmationLink}\"><button>Verify Email Address</button></a>",
                $"</div>",
                $"<div>",
                $"<p>If that does not work, copy and paste the following link in your browser</p>",
                $"<a href=\"{confirmationLink}\">{confirmationLink}</a>",
                $"<br />",
                $"</div>",
                $"<div>",
                $"<p>If you have not requested an account, you can delete this email.</p>",
                $"</div>",
                $"<br />",
                $"<p>Air Ranging App</p>"
            );
        }
    }
}