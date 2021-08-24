using System;
using System.Threading.Tasks;
using Entities.Models.Aircrafts;
using Entities.Models.Identity;

namespace Contracts
{
    public interface IApplicationUserRepository : IBaseRepository<ApplicationUser>
    {
    }
}