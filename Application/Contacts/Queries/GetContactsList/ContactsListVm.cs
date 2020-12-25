using Application.Contacts.Queries.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Contacts.Queries.GetContactsList
{
    public class ContactsListVm
    {
        public IList<ContactDto> Contacts { get; set; }
    }
}
