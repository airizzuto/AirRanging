import { AircraftData } from "../types/Aircraft/Aircraft";
import propsToLabel from "../utils/propsToLabel";

/**
 * Adapts aircraft data to be used by the react-select searchbar.
 * Assigns the data to value and a model property to label.
 * @param data: aircraft data to use in search.
 * @param labelProp: aircraft property to represent model in searchbar.
 * @returns mapped data array to value containing element properties and a label to display it in search.
 */
export const mapAircraftToFilter = (
  data: AircraftData[],
) => {
  return data.map(aircraft => ({
    value: aircraft,
    label: propsToLabel({
      props: [aircraft.manufacturer, aircraft.model, aircraft.variant, aircraft.authorUsername, aircraft.savesCount],
      undefinedReplacement: "N/A",
      separator: " / "})
  }));
};

/**
 * 
 * @param aircraft Aircraft to be compared.
 * @param userAicrafts List of AircraftData.
 * @returns True if aircraft is found in userAircrafts.
 */
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
