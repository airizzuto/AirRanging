import React from 'react';
import { Circle, GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { containerStyle, DEFAULT_MAP_OPTIONS, LIBRARIES } from '../../settings/google-maps/mapSettings';

import { Coordinates } from '../../types/Map/Map';
import { AircraftState } from '../../types/Aircraft/Aircraft';

import Style from "./Map.module.scss";
import Spinner from "../../styles/components/_spinner.module.scss";
import { convertNauticalToMeters } from '../../helpers/mapHelper';

// TODO: https://tomchentw.github.io/react-google-maps/#installation
// TODO REMOVE: reference video https://www.youtube.com/watch?v=WZcxJGmLbSo&t=0s

interface Props {
  selectedAircraft: AircraftState | null;
}

const Map: React.FC<Props> = ({selectedAircraft}): React.ReactElement => {
  const [point, setPoint] = React.useState<Coordinates>();
  // TODO: replace point with an array for route calculation
  // const [points, setPoints] = React.useState<Coordinates[]>();
  // const [selectedPoint, setSelectedPoint] = React.useState();

  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
    libraries: LIBRARIES,
  });

  // Save map in ref if we want to access the map from outside the component
  const mapRef = React.useRef<google.maps.Map | null>();

  const onMapLoad = React.useCallback((map: google.maps.Map): void => {
    mapRef.current = map;
  }, []);

  const onMapUnmount = (): void => {
    mapRef.current = null;
  };

  const onMapClick = React.useCallback((e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setPoint({ 
        latitude: e.latLng.lat(),
        longitude: e.latLng.lng()
      });
    }
  }, []);

  if (loadError) {
    return (
      <div>Error Loading Google Maps</div>
    );
  }

  if (!isLoaded) {
    return (
      <div className={Spinner.spinner}></div>
    );
  }

  return (
    <div className={Style.Map}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={DEFAULT_MAP_OPTIONS as google.maps.MapOptions}
        center={{lat: 51.000, lng: 1.500}} // TODO: take user current location or default to 0,0
        zoom={5}
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        onClick={onMapClick}
      >
        {
          (point && selectedAircraft)
            ? <>
                <Marker 
                  position={{lat: point.latitude, lng: point.longitude}}
                  icon={{
                    url: "./PointSelected.svg",
                    scaledSize: new window.google.maps.Size(10, 10),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(5, 5)
                  }}
                />
                <Circle 
                  center={{lat: point.latitude, lng: point.longitude}}
                  radius={convertNauticalToMeters(selectedAircraft.currentMaxRange)}
                />
              </>
            : null
        }
      </GoogleMap>
    </div>
  );
};

export default Map;
