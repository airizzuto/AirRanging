import { Circle } from '@react-google-maps/api';
import React from 'react';
import { convertNauticalToMeters } from '../../utils/lengthUnitsConvertions';
import { AircraftSelected } from '../../types/Aircraft/Aircraft';
import { Coordinates } from '../../types/Map/MapTypes';

import MapPoint from './MapPoint';

interface Props {
  position: Coordinates;
  aircraftSelected: AircraftSelected;
  deselectPoint: (point: Coordinates) => void;
}

const DrawAircraftRadius: React.FC<Props> = ({position, aircraftSelected, deselectPoint}) => {
  return (
    <>
      <Circle 
        center={{lat: position.latitude, lng: position.longitude}}
        radius={convertNauticalToMeters(aircraftSelected.currentMaxRange)}
        options={{
          clickable: false,
          fillColor: "#36393a",
          strokeColor: "#26bbd9",
          zIndex: 1,
        }}
        draggable={true}
      />
      <MapPoint point={position} onRightClick={deselectPoint}/>
    </>
  );
};

export default DrawAircraftRadius;
