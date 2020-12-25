using Application.Reservations.Queries.Dtos;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Common.Interfaces
{
    public interface IReservationService
    {
        List<FreeTermDto> GetFreeTerms(HairSalon hairSalon);
        List<TermByDateDto> GetAllTerms(HairSalon hairSalon);
    }
}
