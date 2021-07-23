import React from "react";
import Slider from "../Sliders/Slider";

import Style from "./Planning.module.scss";

export default function Planning() {
  const [aircraftState, setAircraftState] = React.useState({
    fuel: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    
    setAircraftState({
      ...aircraftState,
      [e.target.name]: value,
    });
  };

  return (
    <div className={Style.Planning}>
      <div className={Style.PropertiesGroup}>
        <div className={Style.Selected}>
          <label>Selected Aircraft:</label>
          *AIRCRAFT SELECTED*
        </div>
        <div className={Style.Fuel}>
          <label>Fuel Loaded:</label>
          <Slider name="fuel"
            min={0}
            max={100}
            value={aircraftState.fuel}
            handler={handleChange}
          />
        </div>
      </div>

      <hr className={Style.Separator} />

      <div className={Style.ResultsGroup}>
        PLACEHOLDER
      </div>
    </div>
  );
}
