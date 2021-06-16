using System.ComponentModel;
using System.Runtime.Serialization;

namespace Entities.Models.Enums
{
  /// <summary>
  /// Represents the type of engine used in aircraft per ICAO standards.
  /// </summary>
  public enum EEngineType
  {
    Unknown = 0,

    [Description("E")]
    Electric = 1,

    [Description("P")]
    Piston = 2,

    [Description("T")]
    [EnumMember(Value = "Turboprop Turboshaft")]
    TurbopropTurboshaft = 3,

    [Description("J")]
    Jet = 4,

    [Description("R")]
    Rocket = 5,

    [Description("C")]
    [EnumMember(Value = "Two Engines Coupled Single Prop")]
    TwoEngineCoupledProp = 6,
  }
}