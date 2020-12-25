using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Reviews.Commands.UpdateReview
{
    public class UpdateReviewCommand : IRequest
    {
        public int HairSalonId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }

    public class UpdateReviewCommandHandler : IRequestHandler<UpdateReviewCommand>
    {
        private readonly ICurrentUserService _currentUserService;
        private readonly IAppDbContext _context;
        public UpdateReviewCommandHandler(IAppDbContext context, ICurrentUserService currentUserService)
        {
            _context = context;
            _currentUserService = currentUserService;
        }

        public async Task<Unit> Handle(UpdateReviewCommand request, CancellationToken cancellationToken)
        {
            var review = await _context.Reviews.FindAsync(_currentUserService.UserId, request.HairSalonId);

            if (review == null)
            {
                throw new NotFoundException(nameof(Review), new { _currentUserService.UserId, request.HairSalonId });
            }

            review.Rating = request.Rating;
            review.Comment = request.Comment;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}