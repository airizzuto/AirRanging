namespace AirRangingAPI.Domain.Models.Enums
{
  /// <summary>
  /// https://www.faa.gov/documentLibrary/media/Order/Order_7360.1.pdf
  /// The class is part of the description used to distinguish an aircraft type.
  /// </summary>
  public enum EAircraftType
  {
    AutonomousUnmannedAircraft,
    FixedWing,
    AmphibianFixedWing,
    SeaplaneFixedWing,
    Gyrocopter,
    Helicopter,
    RemotelyPilotedAircraft,
    TiltRotor,
  }
}