using Application.Common.Interfaces;
using Application.HairSalons.Queries.GetHairSalonDetails;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.HairSalons.Queries.GetMyHairSalonDetails
{
    public class GetMyHairSalonDetailsQuery : IRequest<HairSalonVm>
    {
    }

    public class GetMyHairSalonDetailsQueryHandler : IRequestHandler<GetMyHairSalonDetailsQuery, HairSalonVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICurrentUserService _currentUserService;

        public GetMyHairSalonDetailsQueryHandler(IAppDbContext context, IMapper mapper, UserManager<AppUser> userManager, ICurrentUserService currentUserService)
        {
            _mapper = mapper;
            _userManager = userManager;
            _currentUserService = currentUserService;
            _context = context;
        }

        public async Task<HairSalonVm> Handle(GetMyHairSalonDetailsQuery request, CancellationToken cancellationToken)
        {
            var user = await _userManager.FindByIdAsync(_currentUserService.UserId);

            var vm = await _context.HairSalons
                    .Where(so => so.Email == user.Email)
                    .ProjectTo<HairSalonVm>(_mapper.ConfigurationProvider)
                    .SingleOrDefaultAsync(cancellationToken);

            return vm;
        }
    }
}
