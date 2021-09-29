import { string, object, SchemaOf, mixed, number } from 'yup';
import { AircraftWithoutIDs } from '../types/Aircraft/Aircraft';
import { EAircraftType, EEngineType, EFuelType, EIcaoWakeCategory, EWeightCategory } from '../types/Aircraft/AircraftEnums';

export const aircraftSchema: SchemaOf<AircraftWithoutIDs> = object().shape({
  icaoId: string()
    .max(4, "ICAO Id must be of no more than 4 characters")
    .matches(
      new RegExp("(?!\\s)+^([A-Za-z0-9-]{0,4})$"),
      "Only alphanumeric values and - are valid. No spaces allowed."
    ),
  manufacturer: string()
    .max(255)
    .matches(
      new RegExp("^[a-zA-Z0-9]+[-\\s\\w/]*[a-zA-Z0-9]$"),
      "Only alphanumeric characters, '/', '-' and spaces are allowed."
    ).defined("Manufacturer must be provided"),
  model: string()
    .max(255)
    .matches(
      new RegExp("^[a-zA-Z0-9]+[-\\s\\w/]*[a-zA-Z0-9]$"),
      "Only alphanumeric characters, '/', '-' and spaces are allowed."
    ).defined("Model must be provided"),
  aircraftType: mixed<keyof typeof EAircraftType>()
    .defined("Aircraft type is required"),
  engineType: mixed<keyof typeof EEngineType>()
    .defined("Engine type is required"),
  weightCategory: mixed<keyof typeof EWeightCategory>()
    .defined("Weight category is required"),
  icaoWakeCategory: mixed<keyof typeof EIcaoWakeCategory>()
    .defined("Wake category is required"),
  fuelType: mixed<keyof typeof EFuelType>()
    .defined("Fuel type is required"),
  engineCount: number()
    .moreThan(0, "Engine must have at least one engine")
    .defined("Aircraft engine count is required"),
  maxTakeoffWeight: number()
    .moreThan(0, "Maximum takeoff weight must be positive"),
  cruiseSpeed: number()
    .positive("Cruise speed must be a positive number"),
  fuelCapacity: number()
    .moreThan(0, "Fuel capacity must be of more than 0")
    .defined("Fuel capacity is required"),
  maxRange: number()
    .moreThan(0, "Max range must be more than 0")
    .defined("Max range is required"),
  serviceCeiling: number()
}).defined();