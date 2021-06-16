using System.ComponentModel;

namespace API.Models.Enums
{
  /// <summary>
  /// Represents the aircraft take-off weight categories:
  /// <para>J - Super. A-380-800 (A338) and An-222 (A225).</para>
  /// <para>H - Heavy. 300_000 pounds or more.</para>
  /// <para>L - Large. 41_000 pounds to 300_000 not included.</para>
  /// <para>S - Small. Less than 41_000 pounds.</para>
  /// </summary>
  public enum EWeightCategory
  {
    Unknown = 0,

    [Description("J")]
    Super = 1,

    [Description("H")]
    Heavy = 2,

    [Description("L")]
    Large = 3,

    [Description("S")]
    Small = 4,
  }
}