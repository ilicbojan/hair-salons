using System;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Reservations.Queries.Dtos
{
  public class FreeTermDto : IMapFrom<Reservation>
  {
    public DateTime Date { get; set; }
    public TimeSpan StartTime { get; set; }
    public int Price { get; set; }
  }
}