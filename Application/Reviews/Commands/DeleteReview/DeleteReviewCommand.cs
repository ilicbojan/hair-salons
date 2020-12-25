using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.Reviews.Commands.DeleteReview
{
    public class DeleteReviewCommand : IRequest
    {
        public int HairSalonId { get; set; }
        public string UserId { get; set; }
    }

    public class DeleteReviewCommandHandler : IRequestHandler<DeleteReviewCommand>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly UserManager<AppUser> _userManager;
        private readonly IAppDbContext _context;

        public DeleteReviewCommandHandler(IAppDbContext context, ICurrentUserService currentUserService, UserManager<AppUser> userManager)
        {
            _context = context;
            _currentUserService = currentUserService;
            _userManager = userManager;
        }

        public async Task<Unit> Handle(DeleteReviewCommand request, CancellationToken cancellationToken)
        {
            var user = await _context.Users.FindAsync(_currentUserService.UserId);
            var isAdmin = await _userManager.IsInRoleAsync(user, RolesEnum.Admin);
            Review review;

            if (isAdmin)
            {
                review = await _context.Reviews.FindAsync(request.UserId, request.HairSalonId);

                if (review == null)
                {
                    throw new NotFoundException(nameof(Review), new { request.UserId, request.HairSalonId, });
                }
            }
            else
            {
                review = await _context.Reviews.FindAsync(user.Id, request.HairSalonId);

                if (review == null)
                {
                    throw new NotFoundException(nameof(Review), new { user.Id, request.HairSalonId, });
                }
            }

            _context.Reviews.Remove(review);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}