import { PaginationInfo } from "../Pagination";
import { Socials } from "../Socials";
import { UnionOmit } from "../UnionOmit";

export interface Landmark {
  id: string,
  icaoId?: string,
  iataId?: string,
  name: string,
  description?: string,
  latitude: number,
  longitude: number,
  altitude: number
}

export type LandmarkWithoutIDs = UnionOmit<Landmark, 'id' | "createdAtDate">;

export interface LandmarkWithSocials extends Socials, Landmark { }

export type LandmarkSearchResult = {
  data: LandmarkWithSocials[],
  pagination: PaginationInfo,
};
