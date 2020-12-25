using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Countries.Queries.GetCountryDetails
{
    public class GetCountryDetailsQuery : IRequest<CountryVm>
    {
        public int Id { get; set; }
    }

    public class GetCountryDetailsQueryHandler : IRequestHandler<GetCountryDetailsQuery, CountryVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetCountryDetailsQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<CountryVm> Handle(GetCountryDetailsQuery request, CancellationToken cancellationToken)
        {
            var vm = await _context.Countries
                  .Where(c => c.Id == request.Id)
                  .ProjectTo<CountryVm>(_mapper.ConfigurationProvider)
                  .SingleOrDefaultAsync(cancellationToken);

            return vm;
        }
    }
}