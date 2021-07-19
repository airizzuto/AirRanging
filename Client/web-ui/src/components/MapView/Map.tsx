import React from 'react'
import Style from "./Map.module.scss"
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { containerStyle, options, center } from '../../settings/google-maps/settings';
import Spinner from "../../styles/_spinner.module.scss";

const Map = (): JSX.Element => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY!
  })

  // Save map in ref if we want to access the map
  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onLoad = (map: google.maps.Map): void => {
    mapRef.current = map;
  }

  const onUnmount = (): void => {
    mapRef.current = null;
  }

  if (!isLoaded) { //FIXME: spinner position
    return (
      <div className={Spinner.spinner}>
      </div>
    )
  }

  return (
    <div className={Style.Map}>
      <GoogleMap id="map"
        mapContainerStyle={containerStyle}
        options={options as google.maps.MapOptions}
        center={center}
        zoom={5}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </div>
  )
}

export default Map
