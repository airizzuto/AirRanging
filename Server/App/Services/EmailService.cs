namespace App.Services
{
    public static class EmailService
    {
        public static string EmailConfirmationContent(string confirmationLink)
        {
            // TODO: Styling, better html
            return string.Concat(
                $"<h1>Confirm your email for AirRangingApp</h1>",
                $"<p>Click button to continue with email verification<p>",
                $"<a href=\"{confirmationLink}\"><button>Confirmation</button></a>",
                $"<p>If that does not work, copy and paste the following link in your browser</p>",
                $"<a href=\"{confirmationLink}\">{confirmationLink}</a>",
                $"<br />",
                $"Air Ranging App"
            );
        }
    }
}