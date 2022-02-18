import React from 'react';
import { Polyline } from '@react-google-maps/api';
import { Coordinates } from '../../types/Map/MapTypes';
import MapPoint from './MapPoint';

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
        <MapPoint
          onRightClick={deselectPoint} 
          point={position}
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
