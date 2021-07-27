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
        <h2>Properties</h2>
        <div className={Style.Selected}>
          <label>Selected Aircraft:</label>
          {/*TODO:*/}*AIRCRAFT SELECTED*
        </div>
        <div className={Style.SliderProp}>
          <label>Fuel Loaded:</label>
          <div className={Style.output}>
            {/*TODO:*/}{aircraftState.fuel} %
          </div>
          <div className={Style.range}>
            <Slider name="fuel"
              min={0}
              max={100}
              value={aircraftState.fuel}
              handler={handleChange}
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
    </div>
  );
}
