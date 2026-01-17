using MediatR;
using Modules.Users.Domain.Entities;
namespace Modules.Users.Domain.Events
{
    public record UserRegisteredDomainEvent(
        AppUser User,
        Guid UserId,
        string Email,
        string FullName
    ) : INotification;
}
