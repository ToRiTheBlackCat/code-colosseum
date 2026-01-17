using CodeColosseum.Shared.Domain;
using FluentValidation;
using MediatR;
using ValidationException = FluentValidation.ValidationException;

namespace CodeColosseum.Shared.Application.Behaviors
{
    public class ValidationPipelineBehavior<TRequest, TResponse>
        : IPipelineBehavior<TRequest, TResponse>
        where TRequest : IRequest<TResponse>
    {
        private readonly IEnumerable<IValidator<TRequest>> _validators;

        public ValidationPipelineBehavior(IEnumerable<IValidator<TRequest>> validators)
        {
            _validators = validators;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (!_validators.Any())
            {
                return await next();
            }

            var context = new ValidationContext<TRequest>(request);
            var validationResults = await Task.WhenAll(
                _validators.Select(v => v.ValidateAsync(context, cancellationToken)));

            var errors = validationResults
                .SelectMany(r => r.Errors)
                .Where(f => f != null)
                .Select(f => new Error(
                    f.PropertyName, 
                    f.ErrorMessage  
                ))
                .Distinct() 
                .ToArray();

            if (errors.Length != 0)
            {
                return CreateValidationResult<TResponse>(errors);
            }

            return await next();
        }

        private static TResult CreateValidationResult<TResult>(Error[] errors)
        {
            if (typeof(TResult) == typeof(Result))
            {
                return (TResult)(object)new ValidationResult(errors, "Validation failed");
            }

            //  Result<T> (Generic)
            var resultType = typeof(TResult);

            if (resultType.IsGenericType && resultType.GetGenericTypeDefinition() == typeof(Result<>))
            {
                var resultValueType = resultType.GetGenericArguments()[0];

                var validationResultType = typeof(ValidationResult<>).MakeGenericType(resultValueType);

                // --- SỬA LỖI Ở ĐÂY ---
                // Constructor for ValidationResult<T>  (Error[], string).
                var validationResult = Activator.CreateInstance(
                    validationResultType,
                    new object[] { errors, "Validation Failure" }
                );

                return (TResult)validationResult!;
            }

            throw new ValidationException(errors.Select(e => new FluentValidation.Results.ValidationFailure(e.Code, e.Description)));
        }
    }
}