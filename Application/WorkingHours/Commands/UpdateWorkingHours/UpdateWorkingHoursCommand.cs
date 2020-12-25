using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.WorkingHours.Commands.UpdateWorkingHours
{
    public class WorkingHourDto
    {
        public int Id { get; set; }
        public int Day { get; set; }
        public string OpenTime { get; set; }
        public string CloseTime { get; set; }
    }

    public class UpdateWorkingHoursCommand : IRequest
    {
        public int HairSalonId { get; set; }
        public List<WorkingHourDto> WorkingHours { get; set; }
    }

    public class UpdateWorkingHoursCommandHandler : IRequestHandler<UpdateWorkingHoursCommand>
    {
        private readonly IAppDbContext _context;
        private readonly IIdentityService _identityService;

        public UpdateWorkingHoursCommandHandler(IAppDbContext context, IIdentityService identityService)
        {
            _context = context;
            _identityService = identityService;
        }

        public async Task<Unit> Handle(UpdateWorkingHoursCommand request, CancellationToken cancellationToken)
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

            var workingHours = hairSalon.WorkingHours;

            foreach (var wh in workingHours)
            {
                foreach (var whNew in request.WorkingHours)
                {
                    if (wh.Day == whNew.Day)
                    {
                        wh.OpenTime = TimeSpan.Parse(whNew.OpenTime);
                        wh.CloseTime = TimeSpan.Parse(whNew.CloseTime);
                        break;
                    }
                }
            }

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}