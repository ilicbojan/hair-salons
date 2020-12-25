using System.Threading.Tasks;
using Application.Common.Models;
using Domain.Entities;

namespace Application.Common.Interfaces
{
    public interface IIdentityService
    {
        Task<string> GetUsernameAsync(string userId);

        Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password);

        Task<Result> DeleteUserAsync(string userId);

        Task<bool> CheckIfClientIsOwnerAsync(HairSalon hairSalon);
        Task<bool> CheckIfUserIsAdmin();

        Task<(Result Result, string RoleId)> CreateRoleAsync(string roleName);

        Task<Result> UpdateRoleAsync(string roleId, string newName);

        Task<Result> DeleteRoleAsync(string roleId);

    }
}