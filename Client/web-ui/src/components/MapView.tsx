import React from "react";

import Style from "./MapView.module.scss"

const token = process.env.REACT_APP_MAPBOX_KEY;

const MapView = (): JSX.Element => {

  return(
    <div className={Style.MapView} id="mapid">
      
    </div>
  )
}

export default MapView;
