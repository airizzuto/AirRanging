import { InfoWindow, Marker } from '@react-google-maps/api';

import { Coordinates } from '../../types/Map/MapTypes';
import { Landmark } from '../../types/Landmark/Landmark';

import markerIcon from "../../assets/icons/PointSelected.svg";
import { useState } from 'react';

interface Props {
  point: Coordinates | Landmark;
  deselectPoint: (point: Coordinates | Landmark) => void;
}

// https://tomchentw.github.io/react-google-maps/#infowindow

const MapPoint: React.FC<Props> = ({ point, deselectPoint }) => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const toggleInfoWindow = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  return (
    <Marker
      key={`marker-${point.latitude},${point.longitude}`}
      position={{lat: point.latitude, lng: point.longitude}}
      icon={{
        url: markerIcon,
        scaledSize: new window.google.maps.Size(10, 10),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(5, 5)
      }}
      draggable={false}
      onClick={() => deselectPoint(point)}
      onRightClick={() => toggleInfoWindow()}
    >{
      isInfoOpen
      && <InfoWindow
          onCloseClick={toggleInfoWindow}
        >
          <div>
            Hello {`${point.latitude},${point.longitude}`} Info Window
          </div>
        </InfoWindow>
    }</Marker>
  );
};

export default MapPoint;
