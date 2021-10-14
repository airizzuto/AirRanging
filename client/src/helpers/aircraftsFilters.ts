
import { AircraftWithSocials } from "../types/Aircraft/Aircraft";
import { AircraftSearchOptions } from "../types/Aircraft/AircraftEnums";
import { Filters, AircraftsSets } from "../types/Aircraft/Filter";

export const filterSets = async (
  data: AircraftWithSocials[],
  dataSet: AircraftWithSocials[],
  filter: keyof AircraftsSets
): Promise<AircraftWithSocials[]> => {
  if (filter && dataSet) data.concat(...dataSet);
  return data;
};

/**
 * Filters data stored in state.
 * @param data 
 * @param filter 
 * @returns Filtered data.
 */
export const filterSearch = async (
  data: AircraftWithSocials[],
  filter: Filters
): Promise<AircraftWithSocials[]> => {
  return data.filter((aircraft) =>
    aircraft[filter.field as keyof AircraftWithSocials] === filter.search
  );
};

/**
 * Reset filter to default state.
 * @returns filter with default state.
 */
export const resetFilter = (): Filters => {
  return {
    set: "all",
    field: AircraftSearchOptions.Model,
    search: "",
  };
};
