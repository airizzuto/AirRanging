import React from 'react';
import { isAircraftInUserList } from '../../helpers/aircraftHelper';
import { AircraftSelected, AircraftWithSocials } from '../../types/Aircraft/Aircraft';
import { Button } from '../Generics/Buttons/Button';

interface Props {
  aircraft?: AircraftWithSocials | AircraftSelected | null;
  aircraftsSaved: AircraftWithSocials[] | null;
  disabled?: boolean,
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const SaveActionsButton: React.FC<Props> = ({aircraft, aircraftsSaved, disabled, handleAircraftUnsave, handleAircraftSave}) => {
  if (aircraft) {
    return (
      isAircraftInUserList(aircraft, aircraftsSaved)
      ? <Button 
          type="button"
          handleClick={() => handleAircraftUnsave(aircraft.id)}
          style={"primary"}
          disabled={disabled}
        >
          SAVED
        </Button>
      : <Button
          type="button"
          handleClick={() => handleAircraftSave(aircraft.id)}
          style={"primary"}
          disabled={disabled}
        >
          SAVE
        </Button>
    );
  }
  return (
    <Button style={'primary'} disabled={true}>
      SAVE
    </Button>
  );
};

export default SaveActionsButton;
