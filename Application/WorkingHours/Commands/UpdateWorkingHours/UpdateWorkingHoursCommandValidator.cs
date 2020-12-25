using System;
using FluentValidation;

namespace Application.WorkingHours.Commands.UpdateWorkingHours
{
    public class UpdateWorkingHoursCommandValidator : AbstractValidator<UpdateWorkingHoursCommand>
    {
        public UpdateWorkingHoursCommandValidator()
        {
            RuleFor(wh => wh.WorkingHours.Count)
                .NotEmpty().WithMessage("Radno vreme je obavezno")
                .InclusiveBetween(7, 7).WithMessage("Morate uneti radno vreme za sve dane");

            RuleForEach(wh => wh.WorkingHours).SetValidator(new WorkingHourValidator());
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
                    .GreaterThan(6).WithMessage("Vreme zatvaranja ne moze biti kasnije od ponoci (24:00)");
            });
        }
    }
}