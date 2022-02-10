import { string, object, SchemaOf, mixed, number } from 'yup';
import { LandmarkWithoutIDs } from '../types/Landmark/Landmark';

export const landmarkSchema: SchemaOf<LandmarkWithoutIDs> = object()
  .shape({
    // TODO
  }).defined();