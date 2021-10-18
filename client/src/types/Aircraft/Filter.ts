import { AircraftFieldsTypes } from "./Aircraft";

export interface AircraftsSets {
    set: AircraftsDataSets;
}

export interface Filters extends AircraftsSets {
    field: AircraftFieldsTypes;
    search: string;
}

export interface AdvancedFilters extends AircraftsSets {
    fields: AircraftFieldsTypes[];
    search: string;
}

export type AircraftsDataSets = "all" | "saved" | "owned";
