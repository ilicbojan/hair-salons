using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Reservations.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Application.Reservations.Queries.GetReservationsList
{
    public class GetReservationsListQuery : IRequest<ReservationsListVm>
    {
        public GetReservationsListQuery(string? status, int? limit, int? offset)
        {
            Status = status;
            Limit = limit;
            Offset = offset;
        }

        public string? Status { get; set; }
        public int? Limit { get; set; }
        public int? Offset { get; set; }
    }

    public class GetReservationsListQueryHandler : IRequestHandler<GetReservationsListQuery, ReservationsListVm>
    {
        private readonly IAppDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly ICurrentUserService _currentUserService;
        private readonly IMapper _mapper;
        private readonly IDateTime _dateTime;

        public GetReservationsListQueryHandler(IAppDbContext context, UserManager<AppUser> userManager, ICurrentUserService currentUserService, IMapper mapper, IDateTime dateTime)
        {
            _mapper = mapper;
            _dateTime = dateTime;
            _context = context;
            _userManager = userManager;
            _currentUserService = currentUserService;
        }

        public async Task<ReservationsListVm> Handle(GetReservationsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new ReservationsListVm();

            var user = await _context.Users.FindAsync(_currentUserService.UserId);
            var isUser = await _userManager.IsInRoleAsync(user, RolesEnum.User);
            var isClient = await _userManager.IsInRoleAsync(user, RolesEnum.Client);

            var queryable = _context.Reservations
                .AsQueryable();

            if (isUser)
            {
                queryable = queryable
                    .Where(x => x.UserId == user.Id);
            }
            else if (isClient)
            {
                queryable = queryable
                    .Where(x => x.HairSalon.Email == user.Email);
            }

            if (request.Status == Status.Pending)
            {
                queryable = queryable.Where(x => x.Status.Status == request.Status
                                                 && (x.Date > _dateTime.Now.Date
                                                     || (x.Date == _dateTime.Now.Date && x.StartTime > _dateTime.Now.TimeOfDay)))
                                     .OrderBy(r => r.Date)
                                     .ThenBy(r => r.StartTime);
            } 
            else if (request.Status == Status.Accepted)
            {
                queryable = queryable.Where(x => x.Status.Status == request.Status)
                                     .OrderByDescending(r => r.Date)
                                     .ThenByDescending(r => r.StartTime);
            } 
            else
            {
                queryable = queryable.OrderByDescending(r => r.Date)
                    .ThenByDescending(r => r.StartTime);
            }

            vm.Reservations = await queryable
                .Skip(request.Offset ?? 0)
                .Take(request.Limit ?? queryable.Count())
                .ProjectTo<ReservationVm>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            vm.ReservationsCount = queryable.Count();

            return vm;
        }
    }
}