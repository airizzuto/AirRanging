import { LandmarkWithSocials } from "../../types/Landmark/Landmark";

import DrawMapLandmark from "./DrawMapLandmark";

interface Props {
  landmarks: LandmarkWithSocials[];
}

export const DrawLandmarks: React.FC<Props> = ({ landmarks }) => {
  return (landmarks.length)
  ? (
      <>
        {landmarks.map(landmark => 
          <DrawMapLandmark landmark={landmark} />
        )}
      </>
  ) : null;
};
