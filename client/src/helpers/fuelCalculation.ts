
interface FuelProps {
  maxRange: number,
  fuelCapacity: number,
  fuelLoaded: number
}

export const calculateRange = ({maxRange, fuelCapacity, fuelLoaded}: FuelProps): number => {
  return ((fuelLoaded * maxRange) / fuelCapacity);
};

export const calculateRadiusOfAction = ({...fuelProps}: FuelProps): number => {
  return calculateRange(fuelProps) / 2; // TODO: (Endurance X GS return)/(2 X TAS)
};
