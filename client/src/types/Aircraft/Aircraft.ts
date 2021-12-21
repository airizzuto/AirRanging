import { PaginationInfo } from "../Pagination";
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from "./AircraftEnums";

export interface Aircraft {
  id: string;
  icaoId: string;
  manufacturer: string;
  model: string;
  variant?: string;
  registration?: string;
  aircraftType: EAircraftType;
  engineType: EEngineType;
  engineCount: number;
  weightCategory: EWeightCategory;
  icaoWakeCategory: EIcaoWakeCategory;
  fuelType: EFuelType;
  fuelCapacity: number;
  maxTakeoffWeight: number;
  minRunwayLength: number;
  cruiseSpeed: number;
  maxRange: number;
  serviceCeiling: number;
  enteredServiceAtYear: number;
  createdAtDate: number;
}

export interface AircraftWithSocials extends Aircraft{
  savesCount: number;
  authorUsername: string;
}

export interface AircraftSelected extends AircraftWithSocials {
  loadedFuel: number;
  currentMaxRange: number;
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type AircraftWithoutIDs = UnionOmit<Aircraft, 'id' | "createdAtDate">;

export type AircraftFieldsTypes = keyof AircraftWithSocials;

export type CloneAircraft = UnionOmit<AircraftWithSocials, "id" | "savesCount" | "authorUsername">;

export type AircraftSearchResult = {
  data: AircraftWithSocials[],
  pagination: PaginationInfo,
};
