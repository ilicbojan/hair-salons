using Application.Common.Interfaces;
using Application.Services.Queries.Dtos;
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

namespace Application.Services.Queries.GetServices
{
    public class GetServicesQuery : IRequest<ServicesVm>
    {
        public int HairSalonId { get; set; }
    }

    public class GetServicesQueryHandler : IRequestHandler<GetServicesQuery, ServicesVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetServicesQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ServicesVm> Handle(GetServicesQuery request, CancellationToken cancellationToken)
        {
            var vm = new ServicesVm();

            vm.Services = await _context.Services
                .Where(x => x.HairSalonId == request.HairSalonId)
                .ProjectTo<ServiceDto>(_mapper.ConfigurationProvider)
                .OrderBy(n => n.Name)
                .ToListAsync(cancellationToken);

            return vm;
        }
    }
}
