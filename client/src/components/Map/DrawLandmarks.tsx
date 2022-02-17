import { Marker } from "@react-google-maps/api";
import { LandmarkWithSocials } from "../../types/Landmark/Landmark";

import airportIcon from "../../assets/icons/airport-svgrepo-com.svg";

interface Props {
  landmarks: LandmarkWithSocials[];
}

// TODO: OnClick add coordinates to mapPoints

export const DrawLandmarks: React.FC<Props> = ({ landmarks }) => {
  return (landmarks.length)
  ? (
      <>
        {landmarks.map(landmark => 
          <Marker 
            key={`landmark-${landmark.latitude},${landmark.longitude}`}
            position={{lat: landmark.latitude, lng: landmark.longitude}}
            icon={{
              url: airportIcon,
              scaledSize: new window.google.maps.Size(25, 25),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(12.5, 12.5)
            }}
          />
        )}
      </>
  ) : null;
};
