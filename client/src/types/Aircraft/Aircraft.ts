import { PaginationInfo } from "../Pagination";
import { BaseModel, BaseModelSets, BaseModelSocials } from "../BaseModel";
import { UnionOmit } from "../UnionOmit";
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from "./AircraftEnums";

export interface Aircraft extends BaseModel {
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
}

export interface AircraftWithSocials extends Aircraft, BaseModelSocials{ }

export interface AircraftSelected extends AircraftWithSocials {
  loadedFuel: number;
  currentMaxRange: number;
}

export interface AircraftsSets {
  set: BaseModelSets;
}

export interface AircraftsFilterSearch extends AircraftsSets {
  set: BaseModelSets
  searchField: AircraftFieldsTypes;
  search: string;
}

export interface AdvancedFilters {
  advancedFilters: Array<AircraftsFilter>;
}

type AircraftsFilter = {
  field: AircraftFieldsTypes,
  value: any
};

export type AircraftWithoutIDs = UnionOmit<Aircraft, 'id' | "createdAtDate" | "modifiedAtDate">;

export type AircraftFieldsTypes = keyof AircraftWithSocials;

export type CloneAircraft = UnionOmit<AircraftWithSocials, "id" | "savesCount" | "authorUsername">;

export type AircraftSearchResult = {
  data: AircraftWithSocials[],
  pagination: PaginationInfo,
};
