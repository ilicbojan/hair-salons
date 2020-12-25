using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.WorkingHours.Commands.CreateWorkingHours
{
    public class CreateWorkingHoursCommandValidator : AbstractValidator<CreateWorkingHoursCommand>
    {
        private readonly IAppDbContext _context;
        public CreateWorkingHoursCommandValidator(IAppDbContext context)
        {
            _context = context;

            RuleFor(wh => wh.WorkingHours.Count)
                .NotEmpty().WithMessage("Radno vreme je obavezno")
                .InclusiveBetween(7, 7).WithMessage("Morate uneti radno vreme za sve dane");

            RuleFor(wh => wh.HairSalonId)
                .MustAsync(WorkingHoursExists)
                .WithMessage("Radno vreme za izabrani frizerski salon vec postoji");

            RuleForEach(wh => wh.WorkingHours).SetValidator(new WorkingHourValidator());
        }

        public async Task<bool> WorkingHoursExists(int hairSalonId, CancellationToken cancellationToken)
        {
            return await _context.WorkingHours.AllAsync(wh => wh.HairSalonId != hairSalonId);
        }
    }

    public class WorkingHourValidator : AbstractValidator<WorkingHourDto>
    {
        public WorkingHourValidator()
        {
            RuleFor(x => TimeSpan.Parse(x.OpenTime).Hours)
                .GreaterThanOrEqualTo(6).WithMessage("Vreme otvaranja mora biti u 06:00 ili kasnije");

            RuleFor(x => TimeSpan.Parse(x.OpenTime))
                .LessThan(x => TimeSpan.Parse(x.CloseTime))
                .When(x => TimeSpan.Parse(x.CloseTime).Hours <= 23 && TimeSpan.Parse(x.CloseTime).Hours > 6)
                .WithMessage("Vreme otvaranja mora da bude manje od vremena zatvaranja");

            When(x => TimeSpan.Parse(x.CloseTime).Hours <= 6 && TimeSpan.Parse(x.CloseTime).Hours >= 1, () =>
            {
                RuleFor(x => TimeSpan.Parse(x.CloseTime).Hours)
                    .GreaterThan(6).WithMessage("Vreme zatvaranja ne moze biti kasnije od ponoci (00:00)");
            });
        }
    }
}