import React from "react";

import Slider from "../../Sliders/Slider";
import DecoratedButton from "../../Buttons/DecoratedButton";

import { AircraftState } from "../../../types/Aircraft/Aircraft";

import Style from "./PlanningModal.module.scss";

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

    const parsedValue = Number(value);

    if (aircraft) {
      aircraftState({...aircraft, loadedFuel: parsedValue});
    }
  };

  // TODO: split render to planning or select depending on aircraft state null or present
  return (
    <div className={Style.Planning}>
      <div className={Style.PropertiesGroup}>
        <h2>Properties</h2>
        <div className={Style.Selected}>
          <label>Selected Aircraft:</label>
          {/* Replace "select an aircraft" with a dropdown or switch to select */}
          <span>{aircraft ? aircraft.model : "Select an aircraft"}</span>
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
              value={aircraft ? aircraft.fuelCapacity : 0}
              handler={handleFuelChange}
            />
          </div>
        </div>
      </div>

      <hr className={Style.Separator} />

      <div className={Style.ResultsGroup}>
        <h2>Information</h2>
          <div className={Style.Results}>
            <label>Max Range:</label>
            <span className={Style.output}>{/*TODO:*/}*CALCULATED RESULT*</span>
          </div>
          <div className={Style.Results}>
            <label>Radius of Action:</label>
            <span className={Style.output}>{/*TODO:*/}*CALCULATED RESULT*</span>
          </div>
      </div>

      <div className={Style.AcceptButton}>
        <DecoratedButton onClick={handleAccept}>Accept</DecoratedButton>
      </div>
    </div>
  );
};

export default PlanningModal;
