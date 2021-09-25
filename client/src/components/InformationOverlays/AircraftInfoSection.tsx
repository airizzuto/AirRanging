import React from 'react';

import { AircraftData } from '../../types/Aircraft/Aircraft';

import Style from "./AircraftInfoSections.module.scss";

interface Props {
  aircraftSelected: AircraftData[] | null;
}

const AircraftInfoSelection: React.FC<Props> = (aircraftSelected) => {
  return (
    <div className={Style.Container}>
      {/* TODO: Info fields */}
    </div>
  );
};

export default AircraftInfoSelection;
