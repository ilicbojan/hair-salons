using System;

namespace Domain.Entities
{
  public class Review
  {
    public string UserId { get; set; }
    public int HairSalonId { get; set; }
    public int Rating { get; set; }
    public string Comment { get; set; }
    public DateTime CreatedAt { get; set; }

    public virtual AppUser User { get; set; }
    public virtual HairSalon HairSalon { get; set; }
  }
}