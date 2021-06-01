namespace API.Models.Enums
{
  /// <summary>
  /// <para>Represents fuel type used for engines.</para>
  /// Reference: Standards weights FAA Weight and Balance Handbook FAA-H-8083-1B 3-4.
  /// </summary>
  public enum EFuelType
  {
    Unknown = 0,
    AvGas = 1,
    JetA = 2,
    Diesel = 3,
    Electric = 4, // TODO: requirements and valids on electric
  }

  // TODO: weights

}