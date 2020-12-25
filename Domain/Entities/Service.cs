using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class Service
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public int HairSalonId { get; set; }
        public virtual HairSalon HairSalon { get; set; }
    }
}
