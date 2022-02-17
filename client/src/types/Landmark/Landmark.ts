import { PaginationInfo } from "../Pagination";
import { CommonData } from "../Socials";
import { UnionOmit } from "../UnionOmit";

export interface Landmark {
  id: string;
  icaoId?: string;
  iataId?: string;
  name: string;
  description?: string;
  latitude: number;
  longitude: number;
  altitude: number;
  imageUrl?: string;
}

export type LandmarkWithoutIDs = UnionOmit<Landmark, 'id' | "createdAtDate">;

export interface LandmarkWithSocials extends CommonData, Landmark { }

export type LandmarkSearchResult = {
  data: LandmarkWithSocials[],
  pagination: PaginationInfo,
};
