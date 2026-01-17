using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace CodeColosseum.Shared.Domain
{
    public sealed record Error(
        [property: JsonPropertyName("field")] string Code,
        [property: JsonPropertyName("description")] string Description)
    {
        public static readonly Error None = new(string.Empty, string.Empty);
    }
}
