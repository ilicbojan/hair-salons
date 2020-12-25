using System;
using Application.Common.Mappings;
using Domain.Entities;

namespace Application.HairSalons.Queries.Dtos
{
    public class WorkingHourDto : IMapFrom<WorkingHour>
    {
        public int Id { get; set; }
        public int Day { get; set; }
        public TimeSpan OpenTime { get; set; }
        public TimeSpan CloseTime { get; set; }
    }
}