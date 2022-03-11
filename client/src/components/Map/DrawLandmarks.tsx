import { LandmarkWithSocials } from "../../types/Landmark/Landmark";

import MapLandmark from "./MapLandmark";

interface Props {
  landmarks: LandmarkWithSocials[];
  landmarksSaved: LandmarkWithSocials[] | null;
  handleLandmarkSave: (landmarkId: string) => Promise<void>;
  handleLandmarkUnsave: (landmarkId: string) => Promise<void>;
}

export const DrawLandmarks: React.FC<Props> = ({ 
  landmarks, landmarksSaved, handleLandmarkSave, handleLandmarkUnsave
}) => {
  return (landmarks.length)
  ? (
      <>
        {landmarks.map(landmark => 
          <MapLandmark 
            key={landmark.id} 
            landmark={landmark}
            landmarksSaved={landmarksSaved}
            handleLandmarkSave={() => handleLandmarkSave(landmark.id)}
            handleLandmarkUnsave={() => handleLandmarkUnsave(landmark.id)}
            />
        )}
      </>
  ) : null;
};
