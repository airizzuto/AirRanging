import { Pagination } from "../Pagination";
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
  maxTakeoffWeight: number;
  cruiseSpeed: number;
  fuelCapacity: number;
  maxRange: number;
  serviceCeiling: number;
}

export interface AircraftData extends Aircraft{
  savesCount: number;
  authorUsername: string;
}

export interface AircraftState extends AircraftData {
  loadedFuel: number;
  currentMaxRange: number;
}

// TODO: Implement paginated model
export interface AircraftsPaginated {
  aircrafts: AircraftData[];
  metadata: Pagination;
}

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export type NewAircraft = UnionOmit<Aircraft, 'id'>;

