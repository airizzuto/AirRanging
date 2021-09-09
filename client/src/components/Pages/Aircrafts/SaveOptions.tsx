import React from 'react';
import { AircraftData } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import LinkedButton from '../../Buttons/LinkedButton';

import Style from "./SaveOptions.module.scss";

interface Props {
  user: UserPublic | null;
  aircraft: AircraftData;
  aircraftsSaved: AircraftData[] | null;
  aircraftsOwned: AircraftData[] | null;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

// TODO: refresh on user log status change
const SaveOptions: React.FC<Props> = ({
  user, // user ref?
  aircraft,
  aircraftsSaved,
  aircraftsOwned,
  handleAircraftSave,
  handleAircraftUnsave
}) => {

  const isAircraftInUserList = (
    aircraft: AircraftData,
    userAicrafts: AircraftData[] | null
  ): boolean => {
    if (!userAicrafts) {
      return false;
    }
    
    return userAicrafts
      .findIndex(userAircraft => userAircraft.id === aircraft.id) >= 0;
  };

  return (
    <div className={Style.SaveOptions}>
      {
        // Checks if user is logged.
        user
          // Checks if user is author.
          ? isAircraftInUserList(aircraft, aircraftsOwned)
            // User is author.
            ? <button disabled={true}>Owned</button>
            // User is not author. Checks if user has saved aircraft.
            : isAircraftInUserList(aircraft, aircraftsSaved)
              ? <button onClick={() => handleAircraftUnsave(aircraft.id)}>Saved</button>
              : <button onClick={() => handleAircraftSave(aircraft.id)}>Save</button>
          // User is not logged.
          : <LinkedButton path={`/login`}>
              Login
            </LinkedButton>
      }

      <LinkedButton path={`/aircrafts/details/${aircraft.id}`}>
        View
      </LinkedButton>
    </div>
  );
};

export default SaveOptions;
