using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Countries.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Countries.Queries.GetCountriesList
{
    public class GetCountriesListQuery : IRequest<CountriesListVm>
    {
    }

    public class GetCountriesListQueryHandler : IRequestHandler<GetCountriesListQuery, CountriesListVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetCountriesListQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<CountriesListVm> Handle(GetCountriesListQuery request, CancellationToken cancellationToken)
        {
            var vm = new CountriesListVm();

            vm.Countries = await _context.Countries
                .ProjectTo<CountryDto>(_mapper.ConfigurationProvider)
                .OrderBy(n => n.Name)
                .ToListAsync(cancellationToken);

            vm.CountriesCount = vm.Countries.Count;

            return vm;
        }
    }
}