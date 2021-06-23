using System.ComponentModel;

namespace Entities.Models.Enums
{
  /// <summary>
  /// <para>Represents the ICAO weight category of an aircraft:</para>
  /// <para>Heavy (H) - Aircraft types of 300_000 pounds or more.</para>
  /// <para>Medium (M) - Aircraft types less than 300_000 pounds and more than 15_500 pounds.</para>
  /// <para>Small (S) - Aircraft types of 15_500 pounds or less.</para>
  /// </summary>
  public enum EIcaoWakeCategory
  {
    Unknown = 0,

    [Description("H")]
    Heavy = 1,

    [Description("M")]
    Medium = 2,

    [Description("L")]
    Light = 3,
  }
}