using System;
using System.Text.Json.Serialization; 

namespace CodeColosseum.Shared.Domain
{
    public class Result
    {
        public string Message { get; }
        public int ErrorCount { get; }
        public string ErrorMessage { get; }

        [JsonIgnore]
        public bool IsSuccess { get; }

        [JsonIgnore]
        public bool IsFailure => !IsSuccess;

        [JsonIgnore]
        public Error Error { get; }

        protected Result(bool isSuccess, Error error, string message)
        {
            if (isSuccess && error != Error.None)
                throw new InvalidOperationException();

            if (!isSuccess && error == Error.None)
                throw new InvalidOperationException();

            IsSuccess = isSuccess;
            Error = error;

            Message = message;
            ErrorCount = isSuccess ? 0 : 1;
            ErrorMessage = isSuccess ? string.Empty : error.Description;
        }


        public static Result Success(string message = "Operation successful")
            => new(true, Error.None, message);

        public static Result Failure(Error error, string message = "Operation failed")
            => new(false, error, message);

        public static Result<T> Success<T>(T value, string message = "Operation successful")
            => new Result<T>(value, true, Error.None, message);

        public static Result<T> Failure<T>(Error error, string message = "Operation failed")
            => new Result<T>(default, false, error, message);
    }

    public class Result<T> : Result
    {
        private readonly T? _data;

        public T? Data => IsSuccess ? _data : default;

        public Result(T? value, bool isSuccess, Error error, string message)
            : base(isSuccess, error, message)
        {
            _data = value;
        }

        [JsonIgnore]
        public T Value => IsSuccess ? _data! : throw new InvalidOperationException("Failure result has no value");
    }
}