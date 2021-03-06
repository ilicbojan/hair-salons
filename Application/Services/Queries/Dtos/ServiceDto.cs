﻿using Application.Common.Mappings;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Services.Queries.Dtos
{
    public class ServiceDto : IMapFrom<Service>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int HairSalonId { get; set; }
    }
}
