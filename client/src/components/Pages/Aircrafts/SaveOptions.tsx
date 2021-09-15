import React from 'react';
import { isAircraftInUserList } from '../../../helpers/aircraftHelper';
import { AircraftData } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import LinkedButton from '../../Buttons/LinkedButton';

interface Props {
  user: UserPublic | null;
  aircraft: AircraftData;
  aircraftsSaved: AircraftData[] | null;
  aircraftsOwned: AircraftData[] | null;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const SaveOptions: React.FC<Props> = ({
  user,
  aircraft,
  aircraftsSaved,
  aircraftsOwned,
  handleAircraftSave,
  handleAircraftUnsave
}) => {
  if (user) {
    if (isAircraftInUserList(aircraft, aircraftsOwned)) {
      return <button disabled={true}>Owned</button>;
    }
    if (isAircraftInUserList(aircraft, aircraftsSaved)) {
      return <button onClick={() => handleAircraftUnsave(aircraft.id)}>Saved</button>;
    }
    return <button onClick={() => handleAircraftSave(aircraft.id)}>Save</button>;
  }

  return (
    <LinkedButton path={`/login`}>
      Login
    </LinkedButton>
  );
};

export default SaveOptions;
