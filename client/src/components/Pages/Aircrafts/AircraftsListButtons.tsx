import React from 'react';
import { isUserOwner } from '../../../helpers/userHelper';
import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import AircraftSaveButton from '../../AircraftActions/AircraftSaveButton';
import { Button, LinkButton } from '../../Generics/Buttons/Button';

interface Props {
  user: UserPublic | null;
  aircraft: AircraftWithSocials;
  aircraftsSaved: AircraftWithSocials[] | null;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const AircraftsListButtons: React.FC<Props> = ({
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
      ? <Button disabled={true} style={"primary"}>OWNED</Button>
      // user is not owner
      : <AircraftSaveButton
          aircraft={aircraft}
          aircraftsSaved={aircraftsSaved}
          handleAircraftSave={handleAircraftSave}
          handleAircraftUnsave={handleAircraftUnsave}
        />
    // user not logged
    : <LinkButton style={"primary"} path={`/login`}>
        SAVE
      </LinkButton>
    
  );
};

export default AircraftsListButtons;
