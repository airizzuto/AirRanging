import React from 'react';

import { AircraftSelected } from '../../types/Aircraft/Aircraft';

import Style from "./AircraftInfoSections.module.scss";

interface Props {
  aircraftSelected: AircraftSelected | null;
}

const AircraftInfoSelection: React.FC<Props> = ({aircraftSelected}) => {
  return (
    !aircraftSelected
    ? <div className={Style.Container}>
        <div className={Style.Header}>
          <h1>NO AIRCRAFT SELECTED</h1>
        </div>
        <div className={Style.Main}>
          <span>NOT AVAILABLE</span>
        </div>
      </div>
    : <div className={Style.Container}>
        <div className={Style.Header}>
          <h1>{aircraftSelected.manufacturer}</h1>
          <h2>{aircraftSelected.model} - {aircraftSelected.variant}</h2>
        </div>

        <table>
          <tr>
            <td>Cruise Speed:</td>
            <td>WIP</td>
          </tr>
          <tr>
            <td>Altitude:</td>
            <td>WIP</td>
          </tr>
          <tr>
            <td>Endurance:</td>
            <td>WIP</td>
          </tr>
          <tr>
            <td>Max Range:</td>
            <td>{aircraftSelected.currentMaxRange}</td>
          </tr>
        </table>
      </div>
  );
};

export default AircraftInfoSelection;
