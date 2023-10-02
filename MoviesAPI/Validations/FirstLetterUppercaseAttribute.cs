using System.ComponentModel.DataAnnotations;

namespace MoviesAPI.Validations
{
    public class FirstLetterUppercaseAttribute : ValidationAttribute
    {
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
            if (value == null || string.IsNullOrEmpty(value.ToString()))
            {
                return ValidationResult.Success;
            }

            var firsLetter = value.ToString()[0].ToString();

            if (firsLetter != firsLetter.ToUpper())
            {
                return new ValidationResult("First letter must be uppercase!");
            }

            return ValidationResult.Success;
        }
    }
}
