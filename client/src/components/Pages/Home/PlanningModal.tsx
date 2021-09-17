import React from "react";

import Slider from "../../Generics/Sliders/Slider";
import { Button } from "../../Generics/Buttons/Button";

import { AircraftState } from "../../../types/Aircraft/Aircraft";

import Style from "./PlanningModal.module.scss";
import { calculateRange } from "../../../helpers/fuelCalculation";

interface Props {
  aircraft?: AircraftState | null;
  aircraftState: React.Dispatch<React.SetStateAction<AircraftState | null>>;
  handleAccept: () => void;
}
const PlanningModal: React.FC<Props> = ({ 
  aircraft,
  aircraftState,
  handleAccept,
}: Props) => {
  const handleFuelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (aircraft) {
      const parsedValue = Number(value);

      const maxRangeValue = Number(calculateRange({
        maxRange: aircraft.maxRange,
        fuelCapacity: aircraft.fuelCapacity,
        fuelLoaded: parsedValue
      }).toFixed(2));

      aircraftState({
        ...aircraft,
        loadedFuel: parsedValue,
        currentMaxRange: maxRangeValue
      });
    }
  };


  // TODO: split render to planning or select depending on aircraft state null or present
  return (
    <div className={Style.Planning}>
      <div className={Style.PropertiesContainer}>
        <h2>Properties</h2>

        <div className={Style.Selected}>
          <label>Selected Aircraft:</label>
          {/* Replace "select an aircraft" with a dropdown or switch to select */}
          <span>{aircraft ? aircraft.model : "Select an aircraft"}</span>
          {/* TODO: additional aircraft info */}
        </div>

        <div className={Style.SliderProp}>
          <label>Fuel Loaded:</label>
          <div className={Style.output}>
            {aircraft ? aircraft.loadedFuel : 0}
          </div>
          <div className={Style.range}>
            <Slider name="loadedFuel"
              min={0}
              max={aircraft ? aircraft.fuelCapacity : 0}
              value={aircraft ? aircraft.loadedFuel : 0}
              handler={handleFuelChange}
            />
          </div>
        </div>
        {/* TODO: GS/TAS */}
      </div>

      {/* TODO: move to info overlay */}
      <hr className={Style.Separator} />
      {aircraft
        ? <div className={Style.ResultsGroup}>
            <h2>Information</h2>
              <div className={Style.Results}>
                <label>Max Range:</label>
                <span className={Style.output}>
                  {aircraft.currentMaxRange}
                </span>
              </div>
              <div className={Style.Results}>
                <label>Radius of Action (PNR):</label>
                <span className={Style.output}>{/*TODO:*/}*WIP*</span>
              </div>
          </div>
        : <div>No aircraft selected</div>
      }
      

      <div className={Style.AcceptButton}>
        <Button handleClick={handleAccept} style="primary">
          Accept
        </Button>
      </div>
    </div>
  );
};

export default PlanningModal;
