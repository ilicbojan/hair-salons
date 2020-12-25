using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.HairSalons.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace Application.HairSalons.Queries.GetHairSalonsList
{
    public class GetHairSalonsListQuery : IRequest<HairSalonsListVm>
    {
        // This code is for paging and filtering
        public GetHairSalonsListQuery(int? cityId, string date, string time, bool isPayed)
        {
            //    Limit = limit;
            //    Offset = offset;
            //    IsPremium = isPremium;
            CityId = cityId;
            Date = date;
            Time = time;
            IsPayed = isPayed;
        }

        //public int? Limit { get; set; }
        //public int? Offset { get; set; }
        public int? CityId { get; set; }
        public string Date { get; set; }
        public string Time { get; set; }
        public bool IsPayed { get; set; }
    }

    public class GetHairSalonsListQueryHandler : IRequestHandler<GetHairSalonsListQuery, HairSalonsListVm>
    {
        private readonly IMapper _mapper;
        private readonly ICurrentUserService _currentUserService;
        private readonly IAppDbContext _context;
        private readonly IReservationService _reservationService;

        public GetHairSalonsListQueryHandler(IAppDbContext context, IReservationService reservationService, IMapper mapper, ICurrentUserService currentUserService)
        {
            _context = context;
            _reservationService = reservationService;
            _mapper = mapper;
            _currentUserService = currentUserService;
        }

        public async Task<HairSalonsListVm> Handle(GetHairSalonsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new HairSalonsListVm();

            var date = request.Date == null ? DateTime.Now.AddDays(1) : DateTime.Parse(request.Date);
            var time = request.Time == null ? new TimeSpan(12, 0, 0) : TimeSpan.Parse(request.Time);

            // Filtering - put filter from request in queryable Where()

            var queryable = _context.HairSalons
                    .OrderBy(so => so.Name)
                    .AsQueryable();

            if (request.IsPayed)
            {
                queryable = queryable.Where(x => x.IsPayed);
            }

            // Filter by city
            if (request.CityId != null)
            {
                queryable = queryable.Where(x => x.CityId == request.CityId);
            }

            // Filter by free term date and time
            if (request.Date != null && request.Time != null)
            {
                queryable = queryable.Where(x => x.IsPremium && x.WorkingHours.Count == 7);

                foreach (var item in queryable)
                {
                    var freeTerms = _reservationService.GetFreeTerms(item);

                    if (!freeTerms.Any(x => x.Date == date && x.StartTime == time))
                    {
                        queryable = queryable.Where(x => x.Id != item.Id);
                    }
                }
            }

            vm.HairSalons = await queryable
            //    .Skip(request.Offset ?? 0)
            //    .Take(request.Limit ?? 4)
                .ProjectTo<HairSalonDto>(_mapper.ConfigurationProvider)
                .ToListAsync(cancellationToken);

            var user = await _context.Users.SingleOrDefaultAsync(u => u.Id == _currentUserService.UserId);

            if (user != null)
            {
                foreach (var item in vm.HairSalons)
                {
                    if (user.Favourites.Any(x => x.HairSalonId == item.Id))
                    {
                        item.IsFavourite = true;
                    }

                    if (user.Reviews.Any(x => x.HairSalonId == item.Id))
                    {
                        item.IsReviewed = true;
                    }
                }
            }

            return vm;
        }
    }
}