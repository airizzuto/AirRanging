import { AircraftFieldsTypes } from "./Aircraft";

export interface AircraftsSets {
    set: AircraftsDataSets;
}

export interface AircraftsFilterSearch extends AircraftsSets {
    searchField: AircraftFieldsTypes;
    search: string;
}

export interface AdvancedFilters {
    advancedFilters: Array<AircraftsFilter>;
}

export type AircraftsDataSets = "all" | "saved" | "owned";

type AircraftsFilter = {
    field: AircraftFieldsTypes,
    value: any
};
