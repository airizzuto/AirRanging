import React from 'react';
import { Marker } from '@react-google-maps/api';
import { Landmark } from '../../types/Landmark/Landmark';

import airportIcon from "../../assets/icons/airport-svgrepo-com.svg";

interface Props {
  landmark: Landmark;
}

const DrawMapLandmark: React.FC<Props> = ({ landmark }) => {
  return (
    <Marker 
      key={`landmark-${landmark.latitude},${landmark.longitude}`}
      position={{lat: landmark.latitude, lng: landmark.longitude}}
      icon={{
        url: airportIcon,
        scaledSize: new window.google.maps.Size(25, 25),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(12.5, 12.5)
      }}
    />
  );
};

export default DrawMapLandmark;
