using System.Threading.Tasks;
using Contracts.Aircrafts;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IAircraftRepository Aircraft { get; }
        Task SaveAsync();
    }
}