import { Marker } from '@react-google-maps/api';

import { Coordinates } from '../../types/Map/MapTypes';
import { Landmark } from '../../types/Landmark/Landmark';

import markerIcon from "../../assets/icons/PointSelected.svg";

interface Props {
  point: Coordinates | Landmark;
  // TODO onLeftClick: (point: Coordinates | Landmark) => void;
  onRightClick: (point: Coordinates | Landmark) => void;
}

const MapPoint: React.FC<Props> = ({ point, onRightClick }) => {
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
      onRightClick={() => onRightClick(point)}
    />
  );
};

export default MapPoint;
