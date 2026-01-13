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

            var failures = validationResults
                .SelectMany(r => r.Errors)
                .Where(f => f != null)
                .ToList();

            if (failures.Count != 0)
            {
                var firstError = failures.First();
                var errorObject = new Error("Validation.Error", firstError.ErrorMessage);
                string message = "Validation Failed";

                // REFLECTION
                // Call automaticall Result.Failure 

                var resultType = typeof(TResponse);

                // Case 1: TResponse is Result<T> 
                if (resultType.IsGenericType && resultType.GetGenericTypeDefinition() == typeof(Result<>))
                {
                    var resultValueType = resultType.GetGenericArguments()[0]; 

                    var failureMethod = typeof(Result)
                        .GetMethods()
                        .FirstOrDefault(m =>
                            m.Name == "Failure" &&
                            m.IsGenericMethod &&
                            m.GetParameters().Length == 2); 

                    if (failureMethod != null)
                    {
                        var genericMethod = failureMethod.MakeGenericMethod(resultValueType);
                        var result = genericMethod.Invoke(null, new object[] { errorObject, message });
                        return (TResponse)result!;
                    }
                }

                // Case 2: TResponse is normal Result (Non-generic)
                else if (resultType == typeof(Result))
                {
                    var failureMethod = typeof(Result)
                        .GetMethods()
                        .FirstOrDefault(m =>
                            m.Name == "Failure" &&
                            !m.IsGenericMethod &&
                            m.GetParameters().Length == 2); 

                    if (failureMethod != null)
                    {
                        var result = failureMethod.Invoke(null, new object[] { errorObject, message });
                        return (TResponse)result!;
                    }
                }

                throw new ValidationException(failures); // Fallback
            }

            return await next();
        }
    }
}