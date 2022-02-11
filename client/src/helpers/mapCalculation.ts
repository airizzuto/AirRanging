import { Coordinates } from "../types/Map/MapTypes";

interface FuelProps {
  maxRange: number,
  fuelCapacity: number,
  fuelLoaded: number
}

const EARTH_RADIUS_KM = 6371;

export const calculateRange = ({maxRange, fuelCapacity, fuelLoaded}: FuelProps): number => {
  return ((fuelLoaded * maxRange) / fuelCapacity);
};

export const calculateRadiusOfAction = ({...fuelProps}: FuelProps): number => {
  return calculateRange(fuelProps) / 2; // TODO: (Endurance X GS return)/(2 X TAS)
};

export const calculateTotalDistance = (mapPoints: Coordinates[]): number => {
  let sum = 0;

  if (mapPoints.length) {
    for (let i = 0; i < mapPoints.length - 1; i++)
    {
      const firstPointCoords: Coordinates = mapPoints[i];
      const secondPointCoords: Coordinates = mapPoints[i+1];

      sum += distanceInKmBetweenCoordinates(firstPointCoords, secondPointCoords);
    }
  }

  return sum;
};

const degreesToRadians = (degrees: number): number => {
  return degrees * Number.parseInt(Math.PI.toFixed(6)) / 180;
};

const distanceInKmBetweenCoordinates = (
  coords1: Coordinates, coords2: Coordinates
): number => {
  const dLat = degreesToRadians(coords2.latitude - coords1.latitude);
  const dLon = degreesToRadians(coords2.longitude - coords1.longitude);

  const lat1 = degreesToRadians(coords1.latitude);
  const lat2 = degreesToRadians(coords2.latitude);

  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) *
            Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = EARTH_RADIUS_KM * c;

  return distance;
};
