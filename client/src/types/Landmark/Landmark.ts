import { Socials } from "../Socials";

export interface Landmark {
  id: string,
  icaoId: string,
  iataId: string,
  name: string,
  description: string,
  latitude: number,
  longitude: number,
  altitude: number
}

export interface LandmarkWithSocials extends Socials, Landmark { }
