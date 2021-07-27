/* TODO REMOVE: https://fullstackopen.com/en/part9/typing_the_express_app#utility-types */

import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from "./enums/AircraftEnums";

// TODO IMPORTANT: PARSE OR DEFINE ONE TYPE
export interface Aircraft {
  id: string;
  icaoId: string;
  manufacturer: string;
  model: string;
  variant?: string;
  registration?: string;
  aircraftType: EAircraftType | string | number;
  engineType: EEngineType | string | number;
  engineCount: number;
  weightCategory: EWeightCategory | string | number;
  icaoWakeCategory: EIcaoWakeCategory | string | number;
  fuelType: EFuelType | string | number;
  maxTakeoffWeight: number | string;
  cruiseSpeed: number | string;
  fuelCapacity: number | string;
  maxRange: number | string;
  serviceCeiling: number | string;
}
