using System.ComponentModel;

namespace API.Domain.Models.Enums
{
  /// <summary>
  /// Take-off weight categories
  /// <para>J - Super. A-380-800 (A338) and An-222 (A225).</para>
  /// <para>H - Heavy. 300_000 pounds or more.</para>
  /// <para>L - Large. 41_000 pounds to 300_000 not included.</para>
  /// <para>S - Small. Less than 41_000 pounds.</para>
  /// </summary>
  public enum EWeightCategory
  {
    [Description("J")]
    Super,

    [Description("H")]
    Heavy,

    [Description("L")]
    Large,

    [Description("S")]
    Small,
  }
}