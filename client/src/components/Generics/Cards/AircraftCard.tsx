import React from 'react';
import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import AircraftsListButtons from '../../Pages/Aircrafts/AircraftsListButtons';
import { LinkButton } from '../Buttons/Button';

import Style from "./AircraftCard.module.scss";

interface Props {
  user: UserPublic | null;
  aircraft: AircraftWithSocials;
  aircraftsSaved: AircraftWithSocials[] | null;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const AircraftCard: React.FC<Props> = ({
  user, aircraft, aircraftsSaved, handleAircraftSave, handleAircraftUnsave
}) => {
  return (
    <div className={Style.Container}>
      <div className={Style.Image}>
        NO IMAGE
      </div>

      <div className={Style.Data}>
        <h1>{aircraft.icaoId} - {aircraft.variant} - {aircraft.registration}</h1>
        <div className={Style.Fields}>
          {/* TODO: Properties */}
        </div>
      </div>

      <div className={Style.Options}>
        <AircraftsListButtons 
          user={user} 
          aircraft={aircraft}
          aircraftsSaved={aircraftsSaved}
          handleAircraftSave={handleAircraftSave}
          handleAircraftUnsave={handleAircraftUnsave}
        />
        <LinkButton
          style={"primary"}
          path={`/aircrafts/details/${aircraft.id}`}
        >
          VIEW
        </LinkButton>
      </div>
    </div>
  );
};

export default AircraftCard;
