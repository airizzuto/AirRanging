import React, { useState } from 'react';
import { InfoWindow, Marker } from '@react-google-maps/api';

import { getUserData } from '../../helpers/userHelper';
import { LandmarkWithSocials } from '../../types/Landmark/Landmark';

import LandmarkSaveButton from '../LandmarkActions/LandmarkSaveButton';

import airportIcon from "../../assets/icons/airport-svgrepo-com.svg";
import InfoWindowStyle from "./InfoWindow.module.scss";

interface Props {
  landmark: LandmarkWithSocials;
  landmarksSaved: LandmarkWithSocials[] | null;
  handleLandmarkSave: (landmarkId: string) => Promise<void>;
  handleLandmarkUnsave: (landmarkId: string) => Promise<void>;
}

/* TODOs
  Info Window:
    2- Set nav button
*/
const MapLandmark: React.FC<Props> = ({ 
  landmark, landmarksSaved, handleLandmarkSave, handleLandmarkUnsave
}) => {
  const [isInfoOpen, setIsInfoOpen] = useState<boolean>(false);

  const toggleInfoWindow = () => {
    setIsInfoOpen(!isInfoOpen);
  };

  return (
    <Marker 
      key={`landmark-${landmark.latitude},${landmark.longitude}`}
      position={{lat: landmark.latitude, lng: landmark.longitude}}
      icon={{
        url: airportIcon,
        scaledSize: new window.google.maps.Size(25, 25),
        origin: new window.google.maps.Point(0, 0),
        anchor: new window.google.maps.Point(12.5, 12.5)
      }}
      onClick={() => toggleInfoWindow()}
    >
      {isInfoOpen
      && <InfoWindow
          onCloseClick={toggleInfoWindow}
        >
          <div className={InfoWindowStyle.InfoWindow}>
            <h1>{landmark.name}</h1>
            <div>
              <p>Description: {landmark.description}</p>
              <p>Lat: {landmark.latitude.toFixed(3)}</p>
              <p>Lon: {landmark.longitude.toFixed(4)}</p>
            </div>
            <div className={InfoWindowStyle.Buttons}>
              {/* TODO: view
                <LinkButton path={'/landmarks/:id'} style={'primary'} state={point}>
                  VIEW
                </LinkButton> 
              */}
              <LandmarkSaveButton
                landmark={landmark}
                landmarksSaved={landmarksSaved}
                handleLandmarkSave={handleLandmarkSave}
                handleLandmarkUnsave={handleLandmarkUnsave}
                disabled={getUserData() === null || !landmark}
              />
            </div>
          </div>
        </InfoWindow>
      }
    </Marker>
  );
};

export default MapLandmark;
