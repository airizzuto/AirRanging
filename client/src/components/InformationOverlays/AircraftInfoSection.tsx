import React from 'react';

import { AircraftWithSocials } from '../../types/Aircraft/Aircraft';
import { Button } from '../Generics/Buttons/Button';

import Style from "./AircraftInfoSections.module.scss";

interface Props {
  aircraftSelected: AircraftWithSocials | null;
}

const AircraftInfoSelection: React.FC<Props> = ({aircraftSelected}) => {
  return (
    <div className={Style.Container}>
      <label htmlFor="">Aircraft Selected</label>
      aircraftSelected 
      ? <span>{aircraftSelected?.model} {aircraftSelected?.variant}</span>
      : <Button style={"undecorated"}>Select</Button>
    </div>
  );
};

export default AircraftInfoSelection;
