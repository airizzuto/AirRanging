using System.Runtime.Serialization;

namespace Entities.Models.Enums
{
  /// <summary>
  /// Represents the description used to distinguish an aircraft type.
  /// </summary>
  public enum EAircraftType
  {
    Unknown = 0,

    [EnumMember(Value = "Autonomous Unmanned Aircraft")]
    AutonomousUnmannedAircraft = 1,

    [EnumMember(Value = "Single Engine Land")]
    SingleEngineLand = 2,

    [EnumMember(Value = "Multi Engine Land")]
    MultiEngineLand = 3,

    [EnumMember(Value = "Single Engine Sea")]
    SingleEngineSea = 4,

    [EnumMember(Value = "Multi Engine Sea")]
    MultiEngineSea = 5,

    Gyrocopter = 6,

    Helicopter = 7,

    [EnumMember(Value = "Remotely Piloted Aircraft")]
    RemotelyPilotedAircraft = 8,

    [EnumMember(Value = "Tilt Rotor")]
    TiltRotor = 9,
  }
}