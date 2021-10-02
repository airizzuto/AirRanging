import { AircraftFieldsTypes } from "./Aircraft";

export interface AircraftsSets {
    owned: boolean;
    saved: boolean;
}

export interface Filters extends AircraftsSets {
    field: AircraftFieldsTypes;
    search: string;
}
