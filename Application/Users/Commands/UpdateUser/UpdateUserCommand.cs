using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Users.Commands.UpdateUser
{
    public class UpdateUserCommand : IRequest
    {
        public string Id { get; set; }
        //public string Email { get; set; }
        public string Username { get; set; }
    }

    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand>
    {
        private readonly UserManager<AppUser> _userManager;
        public UpdateUserCommandHandler(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<Unit> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(request.Id);

            if (user == null)
            {
                throw new NotFoundException(nameof(AppUser), request.Id);
            }

            //user.Email = request.Email;
            user.UserName = request.Username;

            await _userManager.UpdateAsync(user);

            return Unit.Value;
        }
    }
}