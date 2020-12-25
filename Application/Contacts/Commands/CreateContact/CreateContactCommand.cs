using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Contacts.Commands.CreateContact
{
    public class CreateContactCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string Package { get; set; }
        public string Message { get; set; }
    }

    public class CreateContactCommandHandler : IRequestHandler<CreateContactCommand, int>
    {
        private readonly IAppDbContext _context;

        public CreateContactCommandHandler(IAppDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateContactCommand request, CancellationToken cancellationToken)
        {
            var contact = new Contact
            {
                Name = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Package = request.Package,
                Message = request.Message
            };

            _context.Contacts.Add(contact);

            await _context.SaveChangesAsync(cancellationToken);

            return contact.Id;
        }
    }
}
