import React from 'react';
import { useHistory } from 'react-router';
import { AircraftWithSocials } from '../../../types/Aircraft/Aircraft';
import { UserPublic } from '../../../types/User/User';
import { buildStringAircraftTitle } from '../../../utils/stringBuilder';
import AircraftsListButtons from '../../Pages/Aircrafts/AircraftsListButtons';
import { Button, LinkButton } from '../Buttons/Button';

import Style from "./AircraftCard.module.scss";
import PropertyField from './PropertyField';

interface Props {
  user: UserPublic | null;
  aircraft: AircraftWithSocials;
  aircraftsSaved: AircraftWithSocials[] | null;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
}

const AircraftCard: React.FC<Props> = ({
  user,
  aircraft,
  aircraftsSaved,
  handleAircraftSave,
  handleAircraftUnsave,
  handleAircraftSelection
}) => {
  const history = useHistory();

  const handleSelect = () => {
    handleAircraftSelection(aircraft);
    history.push("/");
  };

  return (
    <div className={Style.Container}>
      <div className={Style.Image}>
        NO IMAGE
        <div className={Style.ShortDescription}>
          <label>{aircraft.manufacturer}</label>
          <label>{aircraft.model}</label>
        </div>
      </div>

      <div className={Style.Description}>
        {/* TODO: title function */}
        <h1>
          {buildStringAircraftTitle(
            [
              aircraft.icaoId,
              aircraft?.variant,
              aircraft?.registration,
            ],
            " - ",
            /(\s-\s)+$/,
          )}
        </h1>
        <div className={Style.Fields}>
          <PropertyField property={"Aircraft Type"} value={aircraft.aircraftType} />
          <PropertyField property={"Fuel Type"} value={aircraft.fuelType} />
          <PropertyField property={"Engine Count"} value={aircraft.engineCount} />
          <PropertyField property={"Max Range"} value={aircraft.maxRange} />
          <PropertyField property={"Cruise Speed"} value={aircraft.cruiseSpeed} />
          <PropertyField property={"Service Ceiling"} value={aircraft.serviceCeiling} />
          <PropertyField property={"MTOW"} value={aircraft.maxTakeoffWeight} />
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
        <LinkButton style={"primary"}
          path={`/aircrafts/details/${aircraft.id}`}
        >
          VIEW
        </LinkButton>
        <Button style={'primary'} handleClick={() => handleSelect}>
          SELECT
        </Button>
      </div>
    </div>
  );
};

export default AircraftCard;
