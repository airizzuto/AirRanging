using System.ComponentModel;

namespace API.Domain.Models.Enums
{
  /// <summary>
  /// <para>Heavy (H) - Aircraft types of 300_000 pounds or more.</para>
  /// <para>Medium (M) - Aircraft types less than 300_000 pounds and more than 15_500 pounds.</para>
  /// <para>Small (S) - Aircraft types of 15_500 pounds or less.</para>
  /// </summary>
  public enum EIcaoWakeCategory
  {
    [Description("H")]
    Heavy,

    [Description("M")]
    Medium,

    [Description("L")]
    Light,
  }
}