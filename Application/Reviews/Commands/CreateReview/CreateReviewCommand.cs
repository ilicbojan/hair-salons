using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Reviews.Commands.CreateReview
{
    public class CreateReviewCommand : IRequest
    {
        public int HairSalonId { get; set; }
        public int Rating { get; set; }
        public string Comment { get; set; }
    }

    public class CreateReviewCommandHandler : IRequestHandler<CreateReviewCommand>
    {
        private readonly IAppDbContext _context;
        private readonly ICurrentUserService _currentUserService;
        private readonly IDateTime _dateTime;
        public CreateReviewCommandHandler(IAppDbContext context, ICurrentUserService currentUserService, IDateTime dateTime)
        {
            _dateTime = dateTime;
            _currentUserService = currentUserService;
            _context = context;
        }

        public async Task<Unit> Handle(CreateReviewCommand request, CancellationToken cancellationToken)
        {
            var hairSalon = await _context.HairSalons.FindAsync(request.HairSalonId);

            if (hairSalon == null)
            {
                throw new NotFoundException(nameof(HairSalon), request.HairSalonId);
            }

            var review = new Review
            {
                UserId = _currentUserService.UserId,
                HairSalonId = request.HairSalonId,
                Rating = request.Rating,
                Comment = request.Comment,
                CreatedAt = _dateTime.Now
            };

            _context.Reviews.Add(review);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}