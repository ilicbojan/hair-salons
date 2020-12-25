using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Reservations.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Reservations.Queries.GetFreeTerms
{
    public class GetFreeTermsQuery : IRequest<FreeTermsListVm>
    {
        public int Id { get; set; }
    }

    public class GetFreeTermsQueryHandler : IRequestHandler<GetFreeTermsQuery, FreeTermsListVm>
    {
        private readonly IAppDbContext _context;
        private readonly IReservationService _reservationService;
        private readonly IMapper _mapper;

        public GetFreeTermsQueryHandler(IAppDbContext context, IReservationService reservationService, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
            _reservationService = reservationService;
        }

        public async Task<FreeTermsListVm> Handle(GetFreeTermsQuery request, CancellationToken cancellationToken)
        {
            var vm = new FreeTermsListVm();

            var hairSalon = await _context.HairSalons.FindAsync(request.Id);

            if (hairSalon == null)
            {
                throw new NotFoundException(nameof(HairSalon), request.Id);
            }

            vm.FreeTerms = _reservationService.GetFreeTerms(hairSalon);
            vm.HairSalonId = request.Id;
            vm.FreeTermsCount = vm.FreeTerms.Count;

            return vm;
        }
    }
}

//var workingHours = hairSalon.WorkingHours.ToList();

//if (!workingHours.Any())
//{
//    throw new Exception("Sport object doesn't have working hours");
//}

//var prices = hairSalon.Prices.ToList();

//if (!prices.Any())
//{
//    throw new Exception("Sport object doesn't have prices");
//}

//var futureDays = 7;
//var reservations = hairSalon.Reservations
//    .Where(r => r.Date >= DateTime.Today && r.Date <= DateTime.Today.AddDays(futureDays))
//    .ToList();

//var freeTerms = new List<FreeTermDto>();

//for (int i = 0; i <= futureDays; i++)
//{
//    var date = DateTime.Today.AddDays(i);
//    var day = (int)date.DayOfWeek == 0 ? 7 : (int)date.DayOfWeek;
//    var wh = workingHours.Find(w => w.Day == day);
//    var openTimeHours = wh.OpenTime.Hours;
//    var closeTimeHours = wh.CloseTime.Hours;

//    if (closeTimeHours == 0)
//    {
//        closeTimeHours = 24;
//    }

//    for (int j = openTimeHours; j < closeTimeHours; j++)
//    {
//        var startTime = new TimeSpan(j, 0, 0);
//        var endTime = startTime.Add(TimeSpan.FromHours(1));
//        var price = prices.FirstOrDefault(p => p.TimeTo >= endTime && p.TimeFrom <= startTime);

//        var freeTerm = new FreeTermDto
//        {
//            Date = date,
//            StartTime = startTime,
//            Price = price.PricePerHour
//        };

//        freeTerms.Add(freeTerm);
//    }
//}

//foreach (var ft in freeTerms)
//{
//    vm.FreeTerms.Add(ft);

//    foreach (var res in reservations)
//    {
//        if (ft.Date == res.Date && ft.StartTime == res.StartTime)
//        {
//            vm.FreeTerms.Remove(ft);
//        }
//    }
//}