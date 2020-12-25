using Application.Common.Mappings;
using Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Contacts.Queries.Dtos
{
    public class ContactDto : IMapFrom<Contact>
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Package { get; set; }
        public string Message { get; set; }
    }
}
