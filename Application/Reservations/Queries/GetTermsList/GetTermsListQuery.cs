using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Application.Reservations.Queries.Dtos;
using AutoMapper;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Reservations.Queries.GetTermsList
{
    public class GetTermsListQuery : IRequest<TermsListVm>
    {
        public int Id { get; set; }
    }

    public class GetFreeTermsQueryHandler : IRequestHandler<GetTermsListQuery, TermsListVm>
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

        public async Task<TermsListVm> Handle(GetTermsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new TermsListVm();

            var hairSalon = await _context.HairSalons.FindAsync(request.Id);

            if (hairSalon == null)
            {
                throw new NotFoundException(nameof(HairSalon), request.Id);
            }

            vm.TermsByDate = _reservationService.GetAllTerms(hairSalon);
            vm.HairSalonId = request.Id;

            return vm;
        }
    }
}
