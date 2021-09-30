import { AircraftFields } from "./Aircraft";

export interface AircraftsSets {
    owned: boolean;
    saved: boolean;
}

export interface Filters extends AircraftsSets {
    field: AircraftFields;
    search: string;
}
