import React from 'react';
import { Marker, Polyline } from '@react-google-maps/api';
import { Coordinates } from '../../types/Map/MapTypes';

import markerIcon from "./PointSelected.svg";

interface Props {
  points: Coordinates[];
}

const DrawRoute: React.FC<Props> = ({points}) => {
  const flightPlan: google.maps.LatLng[] = points.map(point => 
    new google.maps.LatLng(point.latitude, point.longitude)
  );

  return (flightPlan.length > 1)
  ? (
    <>
      {points.forEach(position => {
        return (
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
        );
      })}
      <Polyline
        path={flightPlan}
        options={{
          clickable: true,
          strokeColor: "#26bbd9",
        }}
      />
    </>
  )
  : null;
};

export default DrawRoute;
