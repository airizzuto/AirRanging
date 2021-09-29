
// filterHandler(filters) => {
//     filterSetFunction() => {
//       if (filters.showOwned) setCurrentAircrafts(currentAircrafts.concat(owned))
//       if (filters.showSaved) setCurrentAircrafts(currentAircrafts.concat(saved))
//       else setCurrentAircrafts(initialAircrafts)
//     }
//     filterPropsFunction() =>{
//       if (filters.byField && filters.filterInfo)
//         setCurrentAircrafts(currentAircraft.filter(aircraft => aircraft[field] === filter))
//     }
//   }

import { AircraftWithSocials } from "../types/Aircraft/Aircraft";
import { AircraftsFilters, AircraftsSets } from "../types/Aircraft/Filter";

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
    filter: AircraftsFilters,
) => {
    return data.filter(x => x[filter.field] === filter.search);
};
