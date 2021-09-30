
import { AircraftWithSocials } from "../types/Aircraft/Aircraft";
import { Filters, AircraftsSets } from "../types/Aircraft/Filter";

export const filterSets = (
    data: AircraftWithSocials[],
    dataSet: AircraftWithSocials[],
    filter: keyof AircraftsSets
) => {
    if (filter && dataSet) data.concat(...dataSet);
    return data;
};

export const filterSearch = (
    data: AircraftWithSocials[],
    filter: Filters,
) => {
    return data.filter(x => x[filter.field] === filter.search);
};