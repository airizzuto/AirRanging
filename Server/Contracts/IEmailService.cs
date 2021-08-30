using System.Threading.Tasks;
using Entities.Models.Identity;

namespace Contracts
{
    public interface IEmailService
    {
        // Task SendEmailConfirmation(ApplicationUser user);
        Task SendPasswordReset(ApplicationUser user);
    }
}