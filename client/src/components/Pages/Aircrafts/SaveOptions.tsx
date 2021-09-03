import React from 'react';
import { AircraftData } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';

interface Props {
  user: UserPublic | null;
  aircraft: AircraftData;
  aircraftsSaved: AircraftData[] | null;
}

const SaveOptions: React.FC<Props> = ({user, aircraft, aircraftsSaved}) => {
  if (!user) {
    return <button disabled={true}>Save</button>;
  }
  return (
    <>
      {
        aircraft.authorUsername === user?.username
        ? <button>Owned</button>
        : aircraftsSaved?.filter(saved => saved.id !== aircraft.id) // FIXME
          ? <button>Saved</button>
          : <button>Save</button>
      }
    </>
  );
};

export default SaveOptions;
