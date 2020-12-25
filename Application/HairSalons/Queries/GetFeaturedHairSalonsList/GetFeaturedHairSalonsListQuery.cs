using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.HairSalons.Queries.Dtos;
using Application.HairSalons.Queries.GetHairSalonsList;

namespace Application.HairSalons.Queries.GetFeaturedHairSalonsList
{
    public class GetFeaturedHairSalonsListQuery : IRequest<HairSalonsListVm>
    {

    }

    public class GetFeaturedHairSalonsListQueryHandler : IRequestHandler<GetFeaturedHairSalonsListQuery, HairSalonsListVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetFeaturedHairSalonsListQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<HairSalonsListVm> Handle(GetFeaturedHairSalonsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new HairSalonsListVm();

            vm.HairSalons = await _context.HairSalons
                .Where(x => x.IsPremium && x.IsPayed)
                .ProjectTo<HairSalonDto>(_mapper.ConfigurationProvider)
                .OrderBy(x => Guid.NewGuid())
                .Take(3)
                .ToListAsync(cancellationToken);

            return vm;
        }
    }
}
