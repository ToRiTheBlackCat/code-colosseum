using System;
using System.Text.Json.Serialization; 

namespace CodeColosseum.Shared.Domain
{
    public interface IValidationResult
    {
        public static readonly Error ValidationError = new("ValidationError", "A validation problem occurred.");

        Error[] Errors { get; }
    }

    public class Result
    {
        // 1. DATA: Luôn hiện trong JSON (null nếu thất bại hoặc không có data)
        public object? Data { get; protected set; }

        // 2. MESSAGE: Thông báo chung
        public string Message { get; protected set; }

        // 3. ERROR COUNT: Tự động đếm từ mảng Errors
        public int ErrorCount => Errors?.Length ?? 0;

        // 4. ERRORS: Danh sách lỗi (Luôn hiện mảng, kể cả rỗng)
        public Error[] Errors { get; protected set; }

        // --- Các thuộc tính Logic (Không hiện trong JSON) ---
        [JsonIgnore]
        public bool IsSuccess { get; }

        [JsonIgnore]
        public bool IsFailure => !IsSuccess;

        [JsonIgnore]
        public Error Error => IsSuccess || Errors.Length == 0 ? Error.None : Errors[0];

        // Constructor Base
        protected Result(bool isSuccess, Error[] errors, string message, object? data = null)
        {
            // Logic check hợp lệ
            if (isSuccess && errors.Length > 0 && errors[0] != Error.None)
                throw new InvalidOperationException();

            if (!isSuccess && (errors.Length == 0 || errors[0] == Error.None))
                throw new InvalidOperationException();

            IsSuccess = isSuccess;
            Errors = errors;
            Message = message;
            Data = data;
        }

        // --- Factory Methods ---

        // 1. Success
        public static Result Success(string message = "Operation successful")
            => new(true, Array.Empty<Error>(), message, null);

        public static Result<T> Success<T>(T value, string message = "Operation successful")
            => new Result<T>(value, true, Array.Empty<Error>(), message);

        // 2. Failure thường (Tự convert Error đơn lẻ thành mảng 1 phần tử)
        public static Result Failure(Error error, string message = "Operation failed")
            => new(false, new[] { error }, message, null);

        public static Result<T> Failure<T>(Error error, string message = "Operation failed")
            => new Result<T>(default, false, new[] { error }, message);

        // 3. Validation Failure (Nhận mảng Error[])
        public static Result ValidationFailure(Error[] errors, string message = "Validation Failed")
            => new ValidationResult(errors, message);

        public static Result<T> ValidationFailure<T>(Error[] errors, string message = "Validation Failed")
            => new ValidationResult<T>(errors, message);
    }

    // Class Generic (Chỉ để hứng Type T, logic hiển thị JSON nằm hết ở Base)
    public class Result<T> : Result
    {
        public Result(T? value, bool isSuccess, Error[] errors, string message)
            : base(isSuccess, errors, message, value)
        {
        }

        [JsonIgnore]
        public T Value => IsSuccess && Data != null ? (T)Data : throw new InvalidOperationException("Failure result has no value");
    }

    // --- Validation Classes (Giữ lại để Pipeline Reflection hoạt động) ---

    public sealed class ValidationResult : Result, IValidationResult
    {
        public ValidationResult(Error[] errors, string message)
            : base(false, errors, message, null)
        {
        }
    }

    public sealed class ValidationResult<T> : Result<T>, IValidationResult
    {
        public ValidationResult(Error[] errors, string message)
            : base(default, false, errors, message)
        {
        }
    }
}