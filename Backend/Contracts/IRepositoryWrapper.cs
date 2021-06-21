using System.Threading.Tasks;
using Contracts.Aircrafts;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IApplicationUserRepository ApplicationUser { get; }
        IAircraftRepository Aircraft { get; }
        Task SaveAsync();
    }
}