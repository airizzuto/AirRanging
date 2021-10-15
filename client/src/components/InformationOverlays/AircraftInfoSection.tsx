import React from 'react';

import { AircraftSelected } from '../../types/Aircraft/Aircraft';

import Style from "./Section.module.scss";

interface Props {
  aircraftSelected: AircraftSelected | null;
}

const AircraftInfoSection: React.FC<Props> = ({aircraftSelected}) => {
  return (
    !aircraftSelected
    ? <div className={Style.Section}>
        <div className={Style.Header}>
          <h1>NO AIRCRAFT SELECTED</h1>
        </div>
        <div className={Style.Main}>
          <span>NOT AVAILABLE</span>
        </div>
      </div>
    : <div className={Style.Section}>
        <div className={Style.Header}>
          <h1>{aircraftSelected.manufacturer}</h1>
          <h2>{aircraftSelected.model} {aircraftSelected.variant}</h2>
        </div>

        <table className={Style.Main}>
          <tr>
            <td className={Style.Label}>Cruise Speed:</td>
            <td>WIP</td>
          </tr>
          <tr>
            <td className={Style.Label}>Altitude:</td>
            <td>WIP</td>
          </tr>
          <tr>
            <td className={Style.Label}>Endurance:</td>
            <td>WIP</td>
          </tr>
          <tr>
            <td className={Style.Label}>Max Range:</td>
            <td>{aircraftSelected.currentMaxRange}</td>
          </tr>
        </table>
      </div>
  );
};

export default AircraftInfoSection;
