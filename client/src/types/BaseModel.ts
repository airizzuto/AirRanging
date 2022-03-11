import { AircraftWithSocials } from "./Aircraft/Aircraft";
import { LandmarkWithSocials } from "./Landmark/Landmark";

export interface BaseModel {
  id: string;
  imageUrl: string;
}

export interface BaseModelSocials {
  createdAtDate: number;
  modifiedAtDate: number;
  savesCount: number;
  authorUsername: string;
}

export type BaseModelSets = "all" | "saved" | "owned";

export type Resource = AircraftWithSocials | LandmarkWithSocials;