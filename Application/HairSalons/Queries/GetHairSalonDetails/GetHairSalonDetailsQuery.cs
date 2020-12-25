using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.HairSalons.Queries.GetHairSalonDetails
{
    public class GetHairSalonDetailsQuery : IRequest<HairSalonVm>
    {
        public int Id { get; set; }
    }

    public class GetHairSalonDetailsQueryHandler : IRequestHandler<GetHairSalonDetailsQuery, HairSalonVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;

        public GetHairSalonDetailsQueryHandler(IAppDbContext context, IMapper mapper, ICurrentUserService currentUserService)
        {
            _mapper = mapper;
            _currentUserService = currentUserService;
            _context = context;
        }

        public async Task<HairSalonVm> Handle(GetHairSalonDetailsQuery request, CancellationToken cancellationToken)
        {
            var vm = await _context.HairSalons
                    .Where(so => so.Id == request.Id)
                    .ProjectTo<HairSalonVm>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(cancellationToken);

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == _currentUserService.UserId);

            if (user != null)
            {
                if (user.Favourites.Any(x => x.HairSalonId == vm.Id))
                {
                    vm.IsFavourite = true;
                }

                if (user.Reviews.Any(x => x.HairSalonId == vm.Id))
                {
                    vm.IsReviewed = true;
                }
            }

            return vm;
        }
    }
}