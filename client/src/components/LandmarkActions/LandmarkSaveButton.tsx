import React from 'react';
import { isResourceInUserList } from '../../helpers/modelHelpers';
import { LandmarkWithSocials } from '../../types/Landmark/Landmark';
import { Button } from '../Generics/Buttons/Button';

interface Props {
  landmark?: LandmarkWithSocials | null;
  landmarksSaved: LandmarkWithSocials[] | null;
  disabled?: boolean,
  handleLandmarkSave: (landmarkId: string) => Promise<void>;
  handleLandmarkUnsave: (landmarkId: string) => Promise<void>;
}

// TODO: refactor to generic with LandmarkSaveButton
const LandmarkSaveButton: React.FC<Props> = ({landmark, landmarksSaved, disabled, handleLandmarkUnsave, handleLandmarkSave}) => {
  if (landmark) {
    return (
      isResourceInUserList(landmark, landmarksSaved)
      ? <Button 
          type="button"
          handleClick={() => handleLandmarkUnsave(landmark.id)}
          style={"toggle-checked"}
          disabled={disabled}
        >
          SAVED
        </Button>
      : <Button
          type="button"
          handleClick={() => handleLandmarkSave(landmark.id)}
          style={"toggle"}
          disabled={disabled} // TODO: route to login
        >
          SAVE
        </Button>
    );
  }
  return (
    <Button style={'primary'} disabled={disabled}>
      SAVE
    </Button>
  );
};

export default LandmarkSaveButton;
