using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Reviews.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Reviews.Queries.GetReviewsListAll
{
  public class GetReviewsListAllQuery : IRequest<ReviewsListVm>
  {
  }

  public class GetReviewsListAllQueryHandler : IRequestHandler<GetReviewsListAllQuery, ReviewsListVm>
  {
    private readonly IMapper _mapper;
    private readonly IAppDbContext _context;
    public GetReviewsListAllQueryHandler(IAppDbContext context, IMapper mapper)
    {
      _context = context;
      _mapper = mapper;
    }

    public async Task<ReviewsListVm> Handle(GetReviewsListAllQuery request, CancellationToken cancellationToken)
    {
      var vm = new ReviewsListVm();

      vm.Reviews = await _context.Reviews
          .ProjectTo<ReviewDto>(_mapper.ConfigurationProvider)
          .OrderByDescending(r => r.CreatedAt)
          .ToListAsync(cancellationToken);

      vm.ReviewCount = vm.Reviews.Count;

      return vm;
    }
  }
}