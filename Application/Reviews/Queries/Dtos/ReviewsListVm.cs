using System.Collections.Generic;

namespace Application.Reviews.Queries.Dtos
{
    public class ReviewsListVm
    {
        public IList<ReviewDto> Reviews { get; set; } = new List<ReviewDto>();
        public int ReviewCount { get; set; }
    }
}