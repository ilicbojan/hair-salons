using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Contacts.Commands.CreateContact
{
    public class CreateContactCommandValidator : AbstractValidator<CreateContactCommand>
    {
        public CreateContactCommandValidator()
        {
            RuleFor(c => c.Name)
                .NotEmpty().WithMessage("Naziv sportskog objekta je obavezan")
                .MaximumLength(30).WithMessage("Naziv ne sme biti duzi od 30 karaktera");

            RuleFor(c => c.Email)
                .NotEmpty().WithMessage("Email je obavezan")
                .MaximumLength(30).WithMessage("Email ne sme biti duzi od 30 karaktera");

            RuleFor(c => c.PhoneNumber)
                .NotEmpty().WithMessage("Broj telefona je obavezan")
                .MaximumLength(20).WithMessage("Broj telefona ne sme biti duzi od 20 karaktera");

            RuleFor(c => c.Package)
                .NotEmpty().WithMessage("Paket je obavezan")
                .MaximumLength(20).WithMessage("Paket ne sme biti duzi od 30 karaktera");

            RuleFor(c => c.Message)
                .MaximumLength(300).WithMessage("Poruka ne sme biti duza od 300 karaktera");
        }
    }
}
