import React from 'react';
import { Marker, Polyline } from '@react-google-maps/api';
import { Coordinates } from '../../types/Map/MapTypes';

import markerIcon from "../../assets/icons/PointSelected.svg";

interface Props {
  points: Coordinates[];
  deselectPoint: (point: Coordinates) => void;
}

const DrawRoute: React.FC<Props> = ({points, deselectPoint}) => {
  const flightPlan: google.maps.LatLng[] = points.map(point => 
    new google.maps.LatLng(point.latitude, point.longitude)
  );

  return (flightPlan.length > 1)
  ? (
    <>
      {points.map(position => 
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
          onClick={() => deselectPoint(position)}
        />
      )}

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
