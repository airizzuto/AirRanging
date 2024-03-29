import { useState } from 'react';
import { InfoWindow, Marker } from '@react-google-maps/api';

import { Coordinates } from '../../types/Map/MapTypes';
import { Landmark } from '../../types/Landmark/Landmark';

import markerIcon from "../../assets/icons/PointSelected.svg";
import InfoWindowStyle from "./InfoWindow.module.scss";
import { LinkButton } from '../Generics/Buttons/Button';

interface Props {
  point: Coordinates | Landmark;
  deselectPoint: (point: Coordinates | Landmark) => void;
}

// https://tomchentw.github.io/react-google-maps/#infowindow

/* TODOs
  Info Window:
    1- Create landmark button
    2- Set nav button
*/
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
      onRightClick={() => deselectPoint(point)}
      onClick={() => toggleInfoWindow()}
    >{
      isInfoOpen
      && <InfoWindow
          onCloseClick={toggleInfoWindow}
        >
          <div className={InfoWindowStyle.InfoWindow}>
            <h1>Point Selected</h1>
            <p>Lat: {`${point.latitude.toFixed(3)}`}</p>
            <p>Lon: {`${point.longitude.toFixed(4)}`}</p>

            <div className={InfoWindowStyle.Buttons}>
              <LinkButton path={'/landmarks/create'} style={'primary'} state={point}>
                CREATE
              </LinkButton>
            </div>
          </div>
        </InfoWindow>
    }</Marker>
  );
};

export default MapPoint;
