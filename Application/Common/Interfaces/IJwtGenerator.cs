using System.Threading.Tasks;
using Domain.Entities;

namespace Application.Common.Interfaces
{
    public interface IJwtGenerator
    {
        Task<string> CreateToken(AppUser user);
    }
}