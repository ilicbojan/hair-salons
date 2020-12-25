using System.Collections.Generic;

namespace Application.Reservations.Queries.Dtos
{
    public class ReservationsListVm
    {
        public IList<ReservationVm> Reservations { get; set; } = new List<ReservationVm>();
        public int ReservationsCount { get; set; }
    }
}