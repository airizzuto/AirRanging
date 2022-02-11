import { string, object, SchemaOf, number } from 'yup';
import { LandmarkWithoutIDs } from '../types/Landmark/Landmark';

export const landmarkSchema: SchemaOf<LandmarkWithoutIDs> = object()
  .shape({
    icaoId: string()
      .max(4, "ICAO Id must be of no more than 4 characters")
      .matches(
        new RegExp("(?!\\s)+^([A-Za-z0-9-]{0,4})$"),
        "Only alphanumeric values and - are valid. No spaces allowed."
      ),
    iataId: string()
      .max(3, "ICAO Id must be of no more than 4 characters")
      .matches(
        new RegExp("(?!\\s)+^([A-Za-z0-9-]{0,3})$"),
        "Only alphanumeric values and - are valid. No spaces allowed."
      ),
    name: string()
      .max(255)
      .defined("Name must be provided"),
    description: string(),
    latitude: number(),  // TODO
    longitude: number(),  // TODO
    altitude: number()  // TODO
  }).defined();