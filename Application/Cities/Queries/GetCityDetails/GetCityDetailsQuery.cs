using System.Linq;
using System.Threading;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Cities.Queries.GetCityDetails
{
    public class GetCityDetailsQuery : IRequest<CityVm>
    {
        public int Id { get; set; }
    }

    public class GetCityDetailsQueryHandler : IRequestHandler<GetCityDetailsQuery, CityVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetCityDetailsQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

        public async System.Threading.Tasks.Task<CityVm> Handle(GetCityDetailsQuery request, CancellationToken cancellationToken)
        {
            var vm = await _context.Cities
                .Where(c => c.Id == request.Id)
                .ProjectTo<CityVm>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync(cancellationToken);

            return vm;
        }
    }
}