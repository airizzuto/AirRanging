import React from 'react';
import { GoogleMap, useLoadScript } from '@react-google-maps/api';
import { containerStyle, DEFAULT_MAP_CENTER, DEFAULT_MAP_OPTIONS } from '../../settings/google-maps/mapSettings';

import { Coordinates } from '../../types/Map/MapTypes';
import { AircraftSelected } from '../../types/Aircraft/Aircraft';

import Spinner from "../../styles/components/_spinner.module.scss";
import DrawAircraftRadius from './DrawAircraftRadius';
import DrawRoute from './DrawRoute';
import { LandmarkWithSocials } from '../../types/Landmark/Landmark';
import { DrawLandmarks } from './DrawLandmarks';

// docs: https://tomchentw.github.io/react-google-maps/#installation
// reference video: https://www.youtube.com/watch?v=WZcxJGmLbSo&t=0s

interface Props {
  selectedAircraft: AircraftSelected | null;
  mapPoints: Coordinates[];
  landmarks: LandmarkWithSocials[];
  selectMapPoint: (point: Coordinates) => void;
  deselectMapPoint: (point: Coordinates) => void;
}

const Map: React.FC<Props> = ({ 
  selectedAircraft, mapPoints, landmarks, selectMapPoint, deselectMapPoint 
}): React.ReactElement => {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!,
    libraries: ["places", "drawing", "geometry"],
  });

  // Save map in ref if we want to access the map from outside the component
  const mapRef = React.useRef<google.maps.Map | null>();

  const onMapLoad = React.useCallback((map: google.maps.Map): void => {
    mapRef.current = map;
  }, []);

  const onMapUnmount = (): void => {
    mapRef.current = null;
  };

  const onMapLeftClick = React.useCallback((event: google.maps.MapMouseEvent) => {
    event.latLng
    ? selectMapPoint({ 
        latitude: event.latLng.lat(),
        longitude: event.latLng.lng()
      })
    : null;
  }, [selectMapPoint]);

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
      <GoogleMap
        mapContainerStyle={containerStyle}
        options={DEFAULT_MAP_OPTIONS as google.maps.MapOptions}
        // center property must be referenced from a variable, not doing this makes map re-render on click
        center={DEFAULT_MAP_CENTER.london} // TODO: take user current location or default to 0,0
        zoom={5}
        onLoad={onMapLoad}
        onUnmount={onMapUnmount}
        onClick={onMapLeftClick}
      >
        {
          landmarks 
          ? <DrawLandmarks landmarks={landmarks}/>
          : null
        }

        {
          (mapPoints.length && selectedAircraft)
            ? <DrawAircraftRadius 
                position={mapPoints[0]} 
                aircraftSelected={selectedAircraft} 
                deselectPoint={deselectMapPoint}
              />
            : null
        }

        {
          (mapPoints.length)
          ? <DrawRoute 
              points={mapPoints}
              deselectPoint={deselectMapPoint}
            />
          : null
        }
        
      </GoogleMap>
  );
};

export default Map;
