using System.Collections.Generic;

namespace Application.Reservations.Queries.Dtos
{
    public class ReservationStatusesListVm
    {
        public IList<ReservationStatusDto> ReservationStatuses { get; set; } = new List<ReservationStatusDto>();
    }
}