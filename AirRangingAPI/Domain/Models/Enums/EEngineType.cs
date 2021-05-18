using System.ComponentModel;

namespace AirRangingAPI.Domain.Models.Enums
{
  /// <summary>
  /// https://www.faa.gov/documentLibrary/media/Order/Order_7360.1.pdf
  /// 
  /// </summary>
  public enum EEngineType
  {
    [Description("E")]
    Electric,

    [Description("P")]
    Piston,

    [Description("T")]
    TurbopropTurboshaft,

    [Description("J")]
    Jet,

    [Description("R")]
    Rocket,

    [Description("C")]
    TwoEngineCoupledProp,
  }
}