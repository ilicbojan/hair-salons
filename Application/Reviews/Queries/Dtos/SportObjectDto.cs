using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Reviews.Queries.Dtos
{
  public class HairSalonDto : IMapFrom<HairSalon>
  {
    public int Id { get; set; }
    public string Name { get; set; }
  }
}