using System;
using System.Linq;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Common.Models;
using Domain.Entities;
using Domain.Enums;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ICurrentUserService _currentUserService;

        public IdentityService(UserManager<AppUser> userManager, RoleManager<IdentityRole> roleManager, ICurrentUserService currentUserService)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _currentUserService = currentUserService;
        }

        // public async Task<string> GetUserIdAsync(string username)
        // {
        //   var user = await _userManager.Users.FirstAsync(u => u.UserName == username);

        //   return user.Id;
        // }

        public async Task<string> GetUsernameAsync(string userId)
        {
            var user = await _userManager.Users.FirstAsync(u => u.Id == userId);

            return user.UserName;
        }

        public async Task<(Result Result, string UserId)> CreateUserAsync(string userName, string password)
        {
            var user = new AppUser
            {
                UserName = userName,
                Email = userName,
            };

            var result = await _userManager.CreateAsync(user, password);

            return (result.ToApplicationResult(), user.Id);
        }

        public async Task<Result> DeleteUserAsync(string userId)
        {
            var user = _userManager.Users.SingleOrDefault(u => u.Id == userId);

            if (user != null)
            {
                return await DeleteUserAsync(user);
            }

            return Result.Success();
        }

        public async Task<Result> DeleteUserAsync(AppUser user)
        {
            var result = await _userManager.DeleteAsync(user);

            return result.ToApplicationResult();
        }

        public async Task<bool> CheckIfClientIsOwnerAsync(HairSalon hairSalon)
        {
            var userId = _currentUserService.UserId;

            var user = await _userManager.FindByIdAsync(userId);

            var isClient = await _userManager.IsInRoleAsync(user, RolesEnum.Client);

            if (isClient && user.Email == hairSalon.Email)
            {
                return true;
            }

            return false;
        }

        public async Task<bool> CheckIfUserIsAdmin()
        {
            var userId = _currentUserService.UserId;
            var user = await _userManager.FindByIdAsync(userId);
            var isAdmin = await _userManager.IsInRoleAsync(user, RolesEnum.Admin);

            return isAdmin;
        }

        public async Task<(Result Result, string RoleId)> CreateRoleAsync(string roleName)
        {
            var role = new IdentityRole { Name = roleName };

            var result = await _roleManager.CreateAsync(role);

            return (result.ToApplicationResult(), role.Id);
        }

        public async Task<Result> UpdateRoleAsync(string roleId, string newName)
        {
            var role = await _roleManager.FindByIdAsync(roleId);

            if (role == null)
            {
                throw new NotFoundException(nameof(IdentityRole), roleId);
            }

            role.Name = newName;

            var result = await _roleManager.UpdateAsync(role);

            return result.ToApplicationResult();
        }

        public async Task<Result> DeleteRoleAsync(string roleId)
        {
            var role = await _roleManager.FindByIdAsync(roleId);

            if (role != null)
            {
                return await DeleteRoleAsync(role);
            }

            return Result.Success();
        }

        public async Task<Result> DeleteRoleAsync(IdentityRole role)
        {
            var result = await _roleManager.DeleteAsync(role);

            return result.ToApplicationResult();
        }
    }
}