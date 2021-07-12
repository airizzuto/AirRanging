import React from "react";
import { GoogleMap, InfoWindow, useJsApiLoader  } from "@react-google-maps/api";

import Style from "./MapView.module.scss"
import { containerStyle, center, options } from "../../settings/google-maps/settings";

const MapView = (): JSX.Element => {

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

  if (!isLoaded) { //TODO: loading spinner
    return <div>Map loading...</div>
  }

  return(
    // <div className={Style.MapView} id="map">
    //   <GoogleMap 
    //     mapContainerStyle={containerStyle}
    //     options={options as google.maps.MapOptions}
    //     center={center}
    //     zoom={5}
    //     onLoad={onLoad}
    //     onUnmount={onUnmount}
    //   />
    // </div>

    <div>
      
    </div>
  )
}

export default MapView;
