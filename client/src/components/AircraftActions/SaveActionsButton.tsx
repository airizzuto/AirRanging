import React from 'react';
import { isAircraftInUserList } from '../../helpers/aircraftHelper';
import { AircraftData } from '../../types/Aircraft/Aircraft';

interface Props {
  aircraft: AircraftData;
  aircraftsSaved: AircraftData[] | null;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const SaveActionsButton: React.FC<Props> = ({aircraft, aircraftsSaved, handleAircraftUnsave, handleAircraftSave}) => {
  if (isAircraftInUserList(aircraft, aircraftsSaved)) {
    return <button onClick={() => handleAircraftUnsave(aircraft.id)}>SAVED</button>;
  }
  return <button onClick={() => handleAircraftSave(aircraft.id)}>SAVE</button>;
};

export default SaveActionsButton;
