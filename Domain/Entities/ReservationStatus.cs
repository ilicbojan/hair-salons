using System.Collections.Generic;

namespace Domain.Entities
{
  public class ReservationStatus
  {
    public int Id { get; set; }
    public string Status { get; set; }

    public virtual ICollection<Reservation> Reservations { get; set; }
  }
}