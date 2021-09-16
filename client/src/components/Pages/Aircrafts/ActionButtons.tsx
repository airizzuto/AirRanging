import React from 'react';
import { isUserOwner } from '../../../helpers/userHelper';
import { AircraftData } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import SaveActionsButton from '../../AircraftActions/SaveActionsButton';
import LinkedButton from '../../Buttons/LinkedButton';

interface Props {
  user: UserPublic | null;
  aircraft: AircraftData;
  aircraftsSaved: AircraftData[] | null;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const ActionButtons: React.FC<Props> = ({
  user,
  aircraft,
  aircraftsSaved,
  handleAircraftSave,
  handleAircraftUnsave
}) => {
  return (
    user
    // user logged
    ? isUserOwner(aircraft)
      // user is owner
      ? <button disabled={true}>OWNED</button>
      // user is not owner
      : <SaveActionsButton
          aircraft={aircraft}
          aircraftsSaved={aircraftsSaved}
          handleAircraftSave={handleAircraftSave}
          handleAircraftUnsave={handleAircraftUnsave}
        />
    // user not logged
    : <LinkedButton path={`/login`} style={"primary"}>SAVE</LinkedButton>
  );
};

export default ActionButtons;
