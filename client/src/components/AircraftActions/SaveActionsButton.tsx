import React from 'react';
import { isAircraftInUserList } from '../../helpers/aircraftHelper';
import { AircraftData } from '../../types/Aircraft/Aircraft';
import { Button } from '../Generics/Buttons/Button';

interface Props {
  aircraft: AircraftData;
  aircraftsSaved: AircraftData[] | null;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const SaveActionsButton: React.FC<Props> = ({aircraft, aircraftsSaved, handleAircraftUnsave, handleAircraftSave}) => {
  return (
    isAircraftInUserList(aircraft, aircraftsSaved)
    ? <Button handleClick={() => handleAircraftUnsave(aircraft.id)} style={"primary"}>
        SAVED
      </Button>
    : <Button handleClick={() => handleAircraftSave(aircraft.id)} style={"primary"}>
        SAVE
      </Button>
  );
};

export default SaveActionsButton;
