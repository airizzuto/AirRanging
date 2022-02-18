import { Marker } from '@react-google-maps/api';
import { Coordinates } from '../../types/Map/MapTypes';

import markerIcon from "../../assets/icons/PointSelected.svg";

interface Props {
  position: Coordinates;
  deselectPoint: (point: Coordinates) => void;
}

const MapPoint: React.FC<Props> = ({ position, deselectPoint }) => {
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
          draggable={false}
          onRightClick={() => deselectPoint(position)}
        />
  );
};

export default MapPoint;
