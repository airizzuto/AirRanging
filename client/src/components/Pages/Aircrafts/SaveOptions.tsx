import React from 'react';
import { AircraftData } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import LinkedButton from '../../Buttons/LinkedButton';

import Style from "./SaveOptions.module.scss";

interface Props {
  user: UserPublic | null;
  aircraft: AircraftData;
  aircraftsSaved: AircraftData[] | null;
}

const SaveOptions: React.FC<Props> = ({
  user,
  aircraft,
  aircraftsSaved
}) => {
  if (!user) {
    return <button disabled={true}>Save</button>; // TODO: route to loginn
  }

  return (
    <div className={Style.SaveOptions}>
      {
        aircraft.authorUsername === user?.username
        ? <button disabled={true}>Owned</button>
        : aircraftsSaved?.find(saved => saved.id !== aircraft.id) // FIXME
          ? <button>Saved</button>
          : <button>Save</button>
      }

      <LinkedButton path={`/aircrafts/details/${aircraft.id}`}>
              View
      </LinkedButton>
    </div>
  );
};

export default SaveOptions;
