
export enum AircraftType {
  Unknown = "Other",
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

export enum EngineType {
  Unknown = "Other",
  Electric = "Electric",
  Piston = "Piston",
  TurbopropTurboshaft = "Turboprop Turboshaft",
  Jet = "Jet",
  Rocket = "Rocket",
  TwoEngineCoupledProp = "Two Engine Coupled Single Prop"
}

export enum EFuelType {
  Unknown = "Other",
  AvGas = "AvGas",
  JetA = "JetA",
  Diesel = "Diesel",
  Electric = "Electric",
}

export enum EIcaoWakeCategory
{
  Unknown = "Other",
  Heavy = "Heavy",
  Medium = "Medium",
  Light = "Light",
}

export enum EWeightCategory
{
  Unknown = "Other",
  Super = "Super",
  Heavy = "Heavy",
  Large = "Large",
  Small = "Small",
}
