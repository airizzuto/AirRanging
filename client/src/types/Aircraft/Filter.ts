import { AircraftFieldsTypes } from "./Aircraft";

export interface AircraftsSets {
    set: AircraftsDataSets;
}

export interface Filters extends AircraftsSets {
    field: AircraftFieldsTypes;
    search: string;
}

export type AircraftsDataSets = "all" | "saved" | "owned";
