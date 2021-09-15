import { AircraftData } from "../types/Aircraft/Aircraft";

/**
 * Adapts aircraft data to be used by the react-select searchbar.
 * Assigns the data to value and a model property to label.
 * @param data: aircraft data to use in search.
 * @param labelProp: aircraft property to represent model in searchbar.
 * @returns mapped data array to value containing element properties and a label to display it in search.
 */
export const mapAircraftToFilter = (
  data: AircraftData[],
  labelProp: string
) => {
  return data.map(resource => ({
    value: resource,
    label: resource[labelProp as keyof AircraftData]
  }));
};


export const isAircraftInUserList = (
  aircraft: AircraftData,
  userAicrafts: AircraftData[] | null
): boolean => {
  if (!userAicrafts) {
    return false;
  }
  
  return userAicrafts
    .findIndex(userAircraft => userAircraft.id === aircraft.id) >= 0;
};
