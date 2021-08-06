/* TODO REMOVE: https://fullstackopen.com/en/part9/typing_the_express_app#utility-types */

import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from "../enums/AircraftEnums";

// TODO IMPORTANT: PARSE OR DEFINE ONE TYPE
export interface Aircraft {
  id: string;
  icaoId: string;
  manufacturer: string;
  model: string;
  variant?: string;
  registration?: string;
  aircraftType: EAircraftType | string;
  engineType: EEngineType | string;
  engineCount: number | string;
  weightCategory: EWeightCategory | string;
  icaoWakeCategory: EIcaoWakeCategory | string;
  fuelType: EFuelType | string;
  maxTakeoffWeight: number | string;
  cruiseSpeed: number | string;
  fuelCapacity: number | string;
  maxRange: number | string;
  serviceCeiling: number | string;
}

export interface AircraftData extends Aircraft{
  savesCount: number;
  authorUsername?: string; // TODO: Remove optional
}

export interface AircraftState extends AircraftData {
  loadedFuel: number;
}

// TODO: paginated AircraftData
