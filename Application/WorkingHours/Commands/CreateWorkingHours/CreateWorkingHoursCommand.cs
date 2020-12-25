using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using Domain.Enums;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.WorkingHours.Commands.CreateWorkingHours
{
    public class WorkingHourDto
    {
        public int Day { get; set; }
        public string OpenTime { get; set; }
        public string CloseTime { get; set; }
    }

    public class CreateWorkingHoursCommand : IRequest
    {
        public int HairSalonId { get; set; }
        public List<WorkingHourDto> WorkingHours { get; set; }
    }

    public class CreateWorkingHoursCommandHandler : IRequestHandler<CreateWorkingHoursCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public CreateWorkingHoursCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(CreateWorkingHoursCommand request, CancellationToken cancellationToken)
        {
            var hairSalon = await _context.HairSalons.FindAsync(request.HairSalonId);

            if (hairSalon == null)
            {
                throw new NotFoundException(nameof(HairSalon), request.HairSalonId);
            }

            var isAdmin = await _identityService.CheckIfUserIsAdmin();
            var isOwner = await _identityService.CheckIfClientIsOwnerAsync(hairSalon);

            if (!isOwner && !isAdmin)
            {
                throw new Exception("Bad client");
            }

            var workingHours = new List<WorkingHour>();

            foreach (var wh in request.WorkingHours)
            {
                var workingHour = new WorkingHour
                {
                    Day = wh.Day,
                    OpenTime = TimeSpan.Parse(wh.OpenTime),
                    CloseTime = TimeSpan.Parse(wh.CloseTime),
                    HairSalonId = request.HairSalonId
                };

                workingHours.Add(workingHour);
            }

            _context.WorkingHours.AddRange(workingHours);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}