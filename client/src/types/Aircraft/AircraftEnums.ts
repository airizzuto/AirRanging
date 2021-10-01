
export enum EAircraftType {
  Unknown = "Unknown",
  AutonomousUnmannedAircraft = "Autonomous Unmanned Aircraft",
  SingleEngineLand = "Single Engine Land",
  SingleEngineSea = "Single Engine Sea",
  MultiEngineLand = "Multi Engine Land",
  MultiEngineSea = "Multi Engine Sea",
  Gyrocopter = "Gyrocopter",
  Helicopter = "Helicopter",
  RemotelyPilotedAircraft = "Remotely Piloted Aircraft",
  TiltRotor = "Tilt Rotor"
}

export enum EEngineType {
  Unknown = "Unknown",
  Electric = "Electric",
  Piston = "Piston",
  TurbopropTurboshaft = "Turboprop Turboshaft",
  Jet = "Jet",
  Rocket = "Rocket",
  TwoEngineCoupledProp = "Two Engine Coupled Single Prop"
}

export enum EFuelType {
  Unknown = "Unknown",
  AvGas = "AvGas",
  JetA = "JetA",
  Diesel = "Diesel",
  Electric = "Electric",
}

export enum EIcaoWakeCategory
{
  Unknown = "Unknown",
  Heavy = "Heavy",
  Medium = "Medium",
  Light = "Light",
}

export enum EWeightCategory
{
  Unknown = "Unknown",
  Super = "Super",
  Heavy = "Heavy",
  Large = "Large",
  Small = "Small",
}

export enum AircraftFields {
  "ICAO ID" = "icaoId",
  "Manufacturer" = "manufacturer",
  "Model" = "model",
  "Variant" = "variant",
  "Registration" = "registration",
  "Aircraft Type" = "aircraftType",
  "Engine Type" = "engineType",
  "Engine Count" = "engineCount",
  "Weight Category" = "weightCategory",
  "Wake Category" = "wakeCategory",
  "Fuel Type" = "fuelType",
}
