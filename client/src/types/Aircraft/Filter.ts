import { AircraftWithSocials } from "./Aircraft";

export interface AircraftsSets {
    owned: boolean;
    saved: boolean;
}

export interface Filters extends AircraftsSets {
    field: keyof AircraftWithSocials;
    search: string;
}
