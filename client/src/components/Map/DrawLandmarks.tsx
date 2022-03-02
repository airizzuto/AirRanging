import { LandmarkWithSocials } from "../../types/Landmark/Landmark";

import MapLandmark from "./MapLandmark";

interface Props {
  landmarks: LandmarkWithSocials[];
}

export const DrawLandmarks: React.FC<Props> = ({ landmarks }) => {
  return (landmarks.length)
  ? (
      <>
        {landmarks.map(landmark => 
          <MapLandmark landmark={landmark} />
        )}
      </>
  ) : null;
};
