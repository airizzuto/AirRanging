import { Circle, Marker } from '@react-google-maps/api';
import React from 'react';
import { convertNauticalToMeters } from '../../utils/lengthUnitsConvertions';
import { AircraftSelected } from '../../types/Aircraft/Aircraft';
import { Coordinates } from '../../types/Map/MapTypes';

import markerIcon from "./PointSelected.svg";

interface Props {
  position: Coordinates;
  aircraftSelected: AircraftSelected;
}

const DrawAircraftRadius: React.FC<Props> = ({position, aircraftSelected}) => {
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
      />
      <Marker
        key={`marker-${position.latitude},${position.longitude}`}
        position={{lat: position.latitude, lng: position.longitude}}
        icon={{
          url: markerIcon,
          scaledSize: new window.google.maps.Size(10, 10),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(5, 5)
        }}
        draggable={true}
      />
    </>
  );
};

export default DrawAircraftRadius;
