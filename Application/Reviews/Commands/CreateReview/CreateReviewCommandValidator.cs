using FluentValidation;

namespace Application.Reviews.Commands.CreateReview
{
  public class CreateReviewCommandValidator : AbstractValidator<CreateReviewCommand>
  {
    public CreateReviewCommandValidator()
    {
      RuleFor(r => r.Rating)
            .NotEmpty().WithMessage("Ocena je obavezna")
            .InclusiveBetween(1, 5).WithMessage("Ocena mora da bude izmedju 1 i 5");

      RuleFor(r => r.Comment)
            .MaximumLength(500).WithMessage("Komentar ne moze da bude duzi od 500 karaktera");
    }
  }
}