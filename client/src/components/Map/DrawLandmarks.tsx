import { LandmarkWithSocials } from "../../types/Landmark/Landmark";

import MapLandmark from "./MapLandmark";

interface Props {
  landmarks: LandmarkWithSocials[];
  deselectPoint: (landmark: LandmarkWithSocials) => void;
}

export const DrawLandmarks: React.FC<Props> = ({ landmarks, deselectPoint }) => {
  return (landmarks.length)
  ? (
      <>
        {landmarks.map(landmark => 
          <MapLandmark landmark={landmark} deselectPoint={deselectPoint} key={landmark.id}/>
        )}
      </>
  ) : null;
};
