using System;

namespace Domain.Entities
{
  public class WorkingHour
  {
    public int Id { get; set; }
    public int Day { get; set; }
    public TimeSpan OpenTime { get; set; }
    public TimeSpan CloseTime { get; set; }
    public int HairSalonId { get; set; }

    public virtual HairSalon HairSalon { get; set; }
  }
}