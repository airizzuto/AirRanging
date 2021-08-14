import { AircraftData } from "../types/Aircraft/Aircraft";

export const mapAircraftToFilter = (
  data: AircraftData[],
  labelProp: string
) => {
  return data.map(resource => ({
    value: resource,
    label: resource[labelProp as keyof AircraftData]
  }));
};
