using System.Collections.Generic;

namespace Application.Reservations.Queries.Dtos
{
  public class FreeTermsListVm
  {
    public FreeTermsListVm()
    {
      FreeTerms = new List<FreeTermDto>();
    }

    public int HairSalonId { get; set; }
    public int FreeTermsCount { get; set; }
    public IList<FreeTermDto> FreeTerms { get; set; }
  }
}