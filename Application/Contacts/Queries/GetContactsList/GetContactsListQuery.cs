using Application.Common.Interfaces;
using Application.Contacts.Queries.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Contacts.Queries.GetContactsList
{
    public class GetContactsListQuery : IRequest<ContactsListVm>
    {
    }

    public class GetContactsListQueryHandler : IRequestHandler<GetContactsListQuery, ContactsListVm>
    {
        private readonly IAppDbContext _context;
        private readonly IMapper _mapper;

        public GetContactsListQueryHandler(IAppDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ContactsListVm> Handle(GetContactsListQuery request, CancellationToken cancellationToken)
        {
            var vm = new ContactsListVm();

            vm.Contacts = await _context.Contacts
                .ProjectTo<ContactDto>(_mapper.ConfigurationProvider)
                .OrderBy(n => n.Name)
                .ToListAsync(cancellationToken);

            return vm;
        }
    }
}
