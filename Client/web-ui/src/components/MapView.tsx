import React from "react";
import { GoogleMap, InfoWindow, useJsApiLoader  } from "@react-google-maps/api";

import Style from "./MapView.module.scss"

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

  const unMount = (): void => {
    mapRef.current = null;
  }

  return(
    <div className={Style.MapView} id="map">

    </div>
  )
}

export default MapView;
