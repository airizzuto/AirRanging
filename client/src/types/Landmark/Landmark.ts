import { PaginationInfo } from "../Pagination";
import { BaseModel, BaseModelSets, BaseModelSocials } from "../BaseModel";
import { UnionOmit } from "../UnionOmit";

export interface Landmark extends BaseModel {
  icaoId?: string;
  iataId?: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  altitude: number;
}

export interface LandmarksSets {
    set: BaseModelSets;
}

export interface LandmarksFilterSearch extends LandmarksSets {
  searchField: LandmarkFieldsTypes;
  search: string;
}

export const LandmarkSearchOptions = {
  "ICAO ID": "icaoId",
  "IATA ID": "iataId",
  "Name": "name",
} as const;

// type LandmarksFilter = {
//     field: LandmarkFieldsTypes,
//     value: any
// };

export interface LandmarkWithSocials extends BaseModelSocials, Landmark { }

export type LandmarkWithoutIDs = UnionOmit<Landmark, 'id' | "createdAtDate">;

export type LandmarkFieldsTypes = keyof LandmarkWithSocials;

export type LandmarkSearchResult = {
  data: LandmarkWithSocials[],
  pagination: PaginationInfo,
};
