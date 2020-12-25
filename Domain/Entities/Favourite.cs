namespace Domain.Entities
{
  public class Favourite
  {
    public int Id { get; set; }
    public string UserId { get; set; }
    public int HairSalonId { get; set; }

    public virtual AppUser User { get; set; }
    public virtual HairSalon HairSalon { get; set; }
  }
}