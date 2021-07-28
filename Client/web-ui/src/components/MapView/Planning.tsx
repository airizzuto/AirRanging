import React from "react";
import Slider from "../Sliders/Slider";
import DecoratedButton from "../Buttons/DecoratedButton";

import Style from "./Planning.module.scss";

interface Props {
  handleAccept: () => void;
  // TODO: aircraft
  // TODO: aircraft fuel state handler
}

export default function Planning({ handleAccept }: Props) {
  const [aircraft, setAircraft] = React.useState({
    fuelLoaded: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    
    setAircraft({
      ...aircraft,
      [e.target.name]: value,
    });
  };

  return (
    <div className={Style.Planning}>
      <div className={Style.PropertiesGroup}>
        <h2>Properties</h2>
        <div className={Style.Selected}>
          <label>Selected Aircraft:</label>
          <span>*SELECTED AIRCRAFT*</span>
        </div>
        <div className={Style.SliderProp}>
          <label>Fuel Loaded:</label>
          <div className={Style.output}>
            {/*TODO:*/}{aircraft.fuelLoaded} %
          </div>
          <div className={Style.range}>
            <Slider name="fuelLoaded"
              min={0}
              max={100} // TODO: Max aircraft fuel
              value={aircraft.fuelLoaded}
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

      <div className={Style.AcceptButton}>
        <DecoratedButton text="Accept" onClick={handleAccept} />
      </div>
    </div>
  );
}
