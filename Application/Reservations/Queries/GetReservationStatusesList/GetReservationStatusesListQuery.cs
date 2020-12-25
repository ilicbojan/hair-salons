using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using Application.Reservations.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Reservations.Queries.GetReservationStatusesList
{
  public class GetReservationStatusesListQuery : IRequest<ReservationStatusesListVm>
  {

  }

  public class GetReservationStatusesListQueryHandler : IRequestHandler<GetReservationStatusesListQuery, ReservationStatusesListVm>
  {
    private readonly IAppDbContext _context;
    private readonly IMapper _mapper;
    public GetReservationStatusesListQueryHandler(IAppDbContext context, IMapper mapper)
    {
      _mapper = mapper;
      _context = context;
    }

    public async Task<ReservationStatusesListVm> Handle(GetReservationStatusesListQuery request, CancellationToken cancellationToken)
    {
      var vm = new ReservationStatusesListVm();

      vm.ReservationStatuses = await _context.ReservationStatuses
              .ProjectTo<ReservationStatusDto>(_mapper.ConfigurationProvider)
              .OrderBy(rs => rs.Id)
              .ToListAsync(cancellationToken);

      return vm;
    }
  }
}