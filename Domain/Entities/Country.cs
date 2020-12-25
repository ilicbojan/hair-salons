using System.Collections.Generic;

namespace Domain.Entities
{
  public class Country
  {
    public int Id { get; set; }
    public string Name { get; set; }

    public virtual ICollection<City> Cities { get; set; }
  }
}