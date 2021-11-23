import { AircraftFieldsTypes } from "./Aircraft";

export interface AircraftsSets {
    set: AircraftsDataSets;
}

export interface FilterSearch extends AircraftsSets {
    searchField: AircraftFieldsTypes;
    search: string;
}

export interface AdvancedFilters {
    advancedFilters: Array<Filter>;
}

export type AircraftsDataSets = "all" | "saved" | "owned";

type Filter = {
    field: AircraftFieldsTypes,
    value: any
};
