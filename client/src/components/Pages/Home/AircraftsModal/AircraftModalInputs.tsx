import React from 'react';

import { calculateRange } from '../../../../helpers/fuelCalculation';

import { AircraftSelected } from '../../../../types/Aircraft/Aircraft';

import SliderInput from '../../../Generics/InputGroups/SliderInput';
import ValueInput from '../../../Generics/InputGroups/ValueInput';

import Style from "./AircraftModalInputs.module.scss";

interface Props {
  aircraftSelected: AircraftSelected | null;
  handleAircraftState: React.Dispatch<React.SetStateAction<AircraftSelected | null>>;
}

const AircraftModalInputs: React.FC<Props> = ({
  aircraftSelected,
  handleAircraftState,
}) => {
  const handleFuelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (aircraftSelected) {
      const parsedValue = Number(value);

      const maxRangeValue = Number(calculateRange({
        maxRange: aircraftSelected.maxRange,
        fuelCapacity: aircraftSelected.fuelCapacity,
        fuelLoaded: parsedValue
      }).toFixed(2));

      handleAircraftState({
        ...aircraftSelected,
        loadedFuel: parsedValue,
        currentMaxRange: maxRangeValue
      });
    }
  };

  return (
    <div className={Style.Inputs}>
      <SliderInput
        label={"Fuel Loaded:"}
        fieldName={"loadedFuel"}
        currentValue={aircraftSelected ? aircraftSelected.loadedFuel : 0}
        minValue={0}
        maxValue={aircraftSelected ? aircraftSelected.fuelCapacity : 0}
        handleChange={handleFuelChange}
      />

      <ValueInput
        label={"Range:"}
        value={aircraftSelected ? aircraftSelected.currentMaxRange : 0}
      />

      {/* TODO: cruise speed logic for pnr */}
      {/* <ValueInput
        label={"Cruise Speed:"}
        value={0}
      /> */}

      {/* TODO: cruise altitude */}
      {/* <ValueInput
        label={"Cruise Altitude:"}
        value={0}
      /> */}
    </div>
  );
};

export default AircraftModalInputs;
