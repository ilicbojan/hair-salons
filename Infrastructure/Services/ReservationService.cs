using Application.Common.Interfaces;
using Application.Reservations.Queries.Dtos;
using Domain.Entities;
using Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Infrastructure.Services
{
    public class ReservationService : IReservationService
    {
        public List<FreeTermDto> GetFreeTerms(HairSalon hairSalon)
        {
            var workingHours = hairSalon.WorkingHours.ToList();

            if (!workingHours.Any())
            {
                throw new Exception("Sport object doesn't have working hours");
            }

            var futureDays = 7;
            var reservations = hairSalon.Reservations
                .Where(r => r.Date >= DateTime.Today && r.Date <= DateTime.Today.AddDays(futureDays))
                .ToList();

            var freeTerms = new List<FreeTermDto>();

            for (int i = 0; i <= futureDays; i++)
            {
                var date = DateTime.Today.AddDays(i);
                var day = (int)date.DayOfWeek == 0 ? 7 : (int)date.DayOfWeek;
                var wh = workingHours.Find(w => w.Day == day);
                var openTimeHours = wh.OpenTime.Hours;
                var closeTimeHours = wh.CloseTime.Hours;

                if (closeTimeHours == 0)
                {
                    closeTimeHours = 24;
                }

                for (int j = openTimeHours; j < closeTimeHours; j++)
                {
                    var startTime = new TimeSpan(j, 0, 0);
                    var endTime = startTime.Add(TimeSpan.FromHours(1));

                    if (startTime.Hours == 23)
                    {
                        endTime = new TimeSpan(0, 0, 0);
                    }

                    var freeTerm1 = new FreeTermDto
                    {
                        Date = date,
                        StartTime = startTime,
                    };

                    var freeTerm2 = new FreeTermDto
                    {
                        Date = date,
                        StartTime = new TimeSpan(j, 30, 0),
                    };

                    freeTerms.Add(freeTerm1);
                    freeTerms.Add(freeTerm2);
                }
            }

            List<FreeTermDto> output = new List<FreeTermDto>();

            foreach (var ft in freeTerms)
            {
                output.Add(ft);

                foreach (var res in reservations)
                {
                    if (ft.Date == res.Date && ft.StartTime == res.StartTime)
                    {
                        output.Remove(ft);
                    }
                }
            }

            return output;
        }

        public List<TermByDateDto> GetAllTerms(HairSalon hairSalon)
        {
            var workingHours = hairSalon.WorkingHours.ToList();

            if (!workingHours.Any())
            {
                throw new Exception("Sport object doesn't have working hours");
            }

            var futureDays = 7;
            var reservations = hairSalon.Reservations
                .Where(r => r.Date >= DateTime.Today && r.Date <= DateTime.Today.AddDays(futureDays))
                .ToList();

            var termsByDate = new List<TermByDateDto>();

            for (int i = 0; i <= futureDays; i++)
            {
                var date = DateTime.Today.AddDays(i);
                var day = (int)date.DayOfWeek == 0 ? 7 : (int)date.DayOfWeek;
                var wh = workingHours.Find(w => w.Day == day);
                var openTimeHours = wh.OpenTime.Hours;
                var closeTimeHours = wh.CloseTime.Hours;

                if (closeTimeHours == 0)
                {
                    closeTimeHours = 24;
                }

                var termByDate = new TermByDateDto();
                termByDate.Date = date;

                for (int j = openTimeHours; j < closeTimeHours; j++)
                {
                    var startTime = new TimeSpan(j, 0, 0);
                    var endTime = startTime.Add(TimeSpan.FromHours(1));

                    if (startTime.Hours == 23)
                    {
                        endTime = new TimeSpan(0, 0, 0);
                    }

                    var term1 = new TermDto
                    {
                        StartTime = startTime,
                        Status = "free",
                        IsExpired = false
                    };

                    var term2 = new TermDto
                    {
                        StartTime = new TimeSpan(j, 30, 0),
                        Status = "free",
                        IsExpired = false
                    };

                    termByDate.Terms.Add(term1);
                    termByDate.Terms.Add(term2);
                }

                termsByDate.Add(termByDate);
            }


            foreach (var res in reservations)
            {
                foreach (var termByDate in termsByDate)
                {
                    foreach(var term in termByDate.Terms)
                    {
                        if (termByDate.Date == res.Date && term.StartTime == res.StartTime)
                        {
                            term.Status = res.Status.Status;
                        }

                        if (termByDate.Date == DateTime.Today && term.StartTime < DateTime.Now.TimeOfDay)
                        {
                            term.Status = Status.Accepted;
                        }
                    }
                }
            }

            return termsByDate;
        }
    }
}
