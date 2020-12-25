using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Cities.Queries.Dtos;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Cities.Queries.GetCitiesList
{
    public class GetCitiesListQuery : IRequest<CitiesListVm>
    {
    }

    public class GetCitiesQueryHandler : IRequestHandler<GetCitiesListQuery, CitiesListVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetCitiesQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async Task<CitiesListVm> Handle(GetCitiesListQuery request, CancellationToken cancellationToken)
        {
            var vm = new CitiesListVm();

            vm.Cities = await _context.Cities
                .ProjectTo<CityDto>(_mapper.ConfigurationProvider)
                .OrderBy(c => c.Name)
                .ToListAsync(cancellationToken);

            vm.CitiesCount = vm.Cities.Count;

            return vm;
        }
    }
}