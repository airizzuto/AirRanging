namespace API.Domain.Models.Enums
{
  /// <summary>
  /// Represents the description used to distinguish an aircraft type.
  /// </summary>
  public enum EAircraftType
  {
    Unknown = 0,
    AutonomousUnmannedAircraft = 1,
    SingleEngineLand = 2,
    MultiEngineLand = 3,
    SingleEngineSea = 4,
    MultiEngineSea = 5,
    Gyrocopter = 6,
    Helicopter = 7,
    RemotelyPilotedAircraft = 8,
    TiltRotor = 9,
  }
}