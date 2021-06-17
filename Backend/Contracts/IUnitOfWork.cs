using System.Threading.Tasks;
using Contracts.Aircrafts;

namespace Contracts
{
    public interface IUnitOfWork
    {
        IAircraftRepository Aircraft { get; }
        Task SaveAsync();
    }
}