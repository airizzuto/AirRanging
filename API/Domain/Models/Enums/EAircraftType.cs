namespace API.Domain.Models.Enums
{
  /// <summary>
  /// Represents the description used to distinguish an aircraft type.
  /// </summary>
  public enum EAircraftType
  {
    Unknown = 0,
    AutonomousUnmannedAircraft = 1,
    FixedWing = 2,
    AmphibianFixedWing = 3,
    SeaplaneFixedWing = 4,
    Gyrocopter = 5,
    Helicopter = 6,
    RemotelyPilotedAircraft = 7,
    TiltRotor = 8,
  }
}