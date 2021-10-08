
import { Aircraft } from "../types/Aircraft/Aircraft";
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from "../types/Aircraft/AircraftEnums";

const aircrafts: Aircraft[] = [
  {
    id: "f09472d8-8bef-4966-8b33-0fefa5d34192",
    icaoId: "C152",
    manufacturer: "Cessna",
    model: "152",
    // // variant: null,
    // // registration: null,
    aircraftType: EAircraftType.SingleEngineLand,
    engineType: EEngineType.Piston,
    engineCount: 1,
    weightCategory: EWeightCategory.Small,
    icaoWakeCategory: EIcaoWakeCategory.Light,
    fuelType: EFuelType.AvGas,
    maxTakeoffWeight: 1670,
    minRunwayLength: 0,
    cruiseSpeed: 107,
    fuelCapacity: 26,
    maxRange: 415,
    serviceCeiling: 14700,
    enteredServiceAtYear: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "25ddc4bd-d325-426b-beaa-4db5dd506881",
    icaoId: "C152",
    manufacturer: "Cessna",
    model: "152",
    variant: "Long-Range",
    // // registration: null,
    aircraftType: EAircraftType.SingleEngineLand,
    engineType: EEngineType.Piston,
    engineCount: 1,
    weightCategory: EWeightCategory.Small,
    icaoWakeCategory: EIcaoWakeCategory.Light,
    fuelType: EFuelType.AvGas,
    maxTakeoffWeight: 1670,
    minRunwayLength: 0,
    cruiseSpeed: 107,
    fuelCapacity: 38,
    maxRange: 691,
    serviceCeiling: 14700,
    enteredServiceAtYear: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "e21fb48a-c642-4c00-9d49-1d2d907ca1e4",
    icaoId: "C172",
    manufacturer: "Cessna",
    model: "172",
    // variant: null,
    // registration: null,
    aircraftType: EAircraftType.SingleEngineLand,
    engineType: EEngineType.Piston,
    engineCount: 1,
    weightCategory: EWeightCategory.Small,
    icaoWakeCategory: EIcaoWakeCategory.Light,
    fuelType: EFuelType.AvGas,
    maxTakeoffWeight: 0,
    cruiseSpeed: 122,
    fuelCapacity: 56,
    maxRange: 696,
    serviceCeiling: 13500,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "a8e4b73e-8dd5-41aa-9a38-83e6c89d5adf",
    icaoId: "A320",
    manufacturer: "Airbus",
    model: "320",
    // variant: null,
    // registration: null,
    aircraftType: EAircraftType.MultiEngineLand,
    engineType: EEngineType.Jet,
    engineCount: 2,
    weightCategory: EWeightCategory.Large,
    icaoWakeCategory: EIcaoWakeCategory.Medium,
    fuelType: EFuelType.JetA,
    maxTakeoffWeight: 0,
    cruiseSpeed: 447,
    fuelCapacity: 6400,
    maxRange: 3300,
    serviceCeiling: 39100,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "d057f04c-1317-465f-8442-a201fe03a821",
    icaoId: "B753",
    manufacturer: "Boeing",
    model: "757-300",
    // variant: null,
    // registration: null,
    aircraftType: EAircraftType.MultiEngineLand,
    engineType: EEngineType.Jet,
    engineCount: 2,
    weightCategory: EWeightCategory.Large,
    icaoWakeCategory: EIcaoWakeCategory.Medium,
    fuelType: EFuelType.JetA,
    maxTakeoffWeight: 273000,
    cruiseSpeed: 496,
    fuelCapacity: 11466,
    maxRange: 3400,
    serviceCeiling: 42000,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "d654d58a-27ae-4f66-ae65-a690362f981e",
    icaoId: "B738",
    manufacturer: "Boeing",
    model: "737-800",
    // variant: null,
    // registration: null,
    aircraftType: EAircraftType.MultiEngineLand,
    engineType: EEngineType.Jet,
    engineCount: 2,
    weightCategory: EWeightCategory.Large,
    icaoWakeCategory: EIcaoWakeCategory.Medium,
    fuelType: EFuelType.JetA,
    maxTakeoffWeight: 0,
    cruiseSpeed: 453,
    fuelCapacity: 6875,
    maxRange: 2935,
    serviceCeiling: 41000,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "c66e1ed9-d520-4d25-b5e0-f760d0a3e94e",
    icaoId: "A318",
    manufacturer: "Airbus",
    model: "318",
    // variant: null,
    // registration: null,
    aircraftType: EAircraftType.MultiEngineLand,
    engineType: EEngineType.Jet,
    engineCount: 2,
    weightCategory: EWeightCategory.Large,
    icaoWakeCategory: EIcaoWakeCategory.Medium,
    fuelType: EFuelType.JetA,
    maxTakeoffWeight: 150000,
    cruiseSpeed: 447,
    fuelCapacity: 6400,
    maxRange: 3100,
    serviceCeiling: 39100,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "8f282838-6095-4ec1-9aee-7f93a3b0b17a",
    icaoId: "B78X",
    manufacturer: "Boeing",
    model: "787-10",
    aircraftType: EAircraftType.MultiEngineLand,
    engineCount: 2,
    engineType: EEngineType.Jet,
    weightCategory: EWeightCategory.Heavy,
    icaoWakeCategory: EIcaoWakeCategory.Heavy,
    fuelType: EFuelType.JetA,
    maxTakeoffWeight: 560000,
    cruiseSpeed: 488,
    fuelCapacity: 223673,
    maxRange: 6430,
    serviceCeiling: 41100,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "9b1e2ceb-2dd0-4cbd-89e5-d8a7813bf822",
    icaoId: "SPIT",
    manufacturer: "Supermarine",
    model: "Spitfire Mk IXe",
    variant: "Combat - Internal Fuel",
    aircraftType: EAircraftType.SingleEngineLand,
    engineCount: 1,
    engineType: EEngineType.Piston,
    weightCategory: EWeightCategory.Small,
    icaoWakeCategory: EIcaoWakeCategory.Light,
    fuelType: EFuelType.Unknown,
    maxTakeoffWeight: 7400,
    cruiseSpeed: 250,
    fuelCapacity: 85,
    maxRange: 434,
    serviceCeiling: 42500,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "b56714f3-8aa5-45d5-8f72-b6aae4aebc4b",
    icaoId: "SPIT",
    manufacturer: "Supermarine",
    model: "Spitfire Mk IXe",
    variant: "Ferry - 90 gal Fuel Tank",
    aircraftType: EAircraftType.SingleEngineLand,
    engineCount: 1,
    engineType: EEngineType.Piston,
    weightCategory: EWeightCategory.Small,
    icaoWakeCategory: EIcaoWakeCategory.Light,
    fuelType: EFuelType.Unknown,
    maxTakeoffWeight: 7400,
    cruiseSpeed: 250,
    fuelCapacity: 175,
    maxRange: 851,
    serviceCeiling: 42500,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "9f591e4c-a083-42de-bb5c-142292491795",
    icaoId: "P47",
    manufacturer: "Republic",
    model: "P-47D Thunderbolt",
    variant: "Combat",
    aircraftType: EAircraftType.SingleEngineLand,
    engineCount: 1,
    engineType: EEngineType.Piston,
    weightCategory: EWeightCategory.Small,
    icaoWakeCategory: EIcaoWakeCategory.Light,
    fuelType: EFuelType.Unknown,
    maxTakeoffWeight: 17500,
    cruiseSpeed: 304,
    fuelCapacity: 370,
    maxRange: 391,
    serviceCeiling: 42000,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "38f08a09-c882-46e1-8656-819c1000994f",
    icaoId: "P51",
    manufacturer: "North American",
    model: "P-51D Mustang",
    variant: "Combat",
    aircraftType: EAircraftType.SingleEngineLand,
    engineCount: 1,
    engineType: EEngineType.Piston,
    weightCategory: EWeightCategory.Small,
    icaoWakeCategory: EIcaoWakeCategory.Light,
    fuelType: EFuelType.Unknown,
    maxTakeoffWeight: 12100,
    cruiseSpeed: 315,
    fuelCapacity: 269,
    maxRange: 651,
    serviceCeiling: 41900,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
  {
    id: "2ef294e3-60fa-4e8d-98c3-12ae6da79e9d",
    icaoId: "P38",
    manufacturer: "Lockheed",
    model: "P-38L Lightning",
    variant: "Combat",
    aircraftType: EAircraftType.MultiEngineLand,
    engineCount: 2,
    engineType: EEngineType.Piston,
    weightCategory: EWeightCategory.Small,
    icaoWakeCategory: EIcaoWakeCategory.Light,
    fuelType: EFuelType.Unknown,
    maxTakeoffWeight: 21600,
    cruiseSpeed: 239,
    fuelCapacity: 410,
    maxRange: 1100,
    serviceCeiling: 44000,
    enteredServiceAtYear: 0,
    minRunwayLength: 0,
    createdAtDate: Date.now(),
  },
];

export default aircrafts;
