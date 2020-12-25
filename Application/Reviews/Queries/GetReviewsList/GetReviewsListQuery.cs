using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Reviews.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Reviews.Queries.GetReviewsList
{
    public class GetReviewsListQuery : IRequest<ReviewsListVm>
    {
        public int HairSalonId { get; set; }
    }

    public class GetReviewsListQueryHandler : IRequestHandler<GetReviewsListQuery, ReviewsListVm>
    {
        private readonly IMapper _mapper;
        private readonly IAppDbContext _context;
        public GetReviewsListQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ReviewsListVm> Handle(GetReviewsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new ReviewsListVm();

            vm.Reviews = await _context.Reviews
                .Where(r => r.HairSalonId == request.HairSalonId)
                .ProjectTo<ReviewDto>(_mapper.ConfigurationProvider)
                .OrderByDescending(r => r.CreatedAt)
                .ToListAsync(cancellationToken);

            vm.ReviewCount = vm.Reviews.Count;

            return vm;
        }
    }
}