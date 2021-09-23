import React from 'react';
import { getUserData } from '../../../helpers/userHelper';
import { AircraftData } from '../../../types/Aircraft/Aircraft';

import SaveActionsButton from '../../AircraftActions/SaveActionsButton';
import { Button } from '../../Generics/Buttons/Button';

import "./ActionsButtons.scss";

export interface IAircraftButtonsHandlers {
  handleEdit: (aircraftId: string, editedAircraft: AircraftData) => Promise<void>;
  handleSelect: (selected: AircraftData) => void;
  handleSubmit: (editedAircraft: AircraftData) => Promise<void>;
  handleSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleDelete: (
    aircraftId: string, aircraftModel: string, aircraftVariant?: string | undefined
    ) => Promise<void>
  handleCloning: (aircraftToClone: AircraftData) => Promise<void>;
  handleEditModeSwitch: () => void;
}

interface Props {
  aircraft: AircraftData;
  aircraftsSaved: AircraftData[] | null;
  isEditMode: boolean;
  isAircraftOwned: boolean;
  handlers: IAircraftButtonsHandlers;
}

const AircraftActionsButtons: React.FC<Props> = ({ 
  aircraft, isEditMode, isAircraftOwned, aircraftsSaved, handlers
}) => {
  return (
    <div className={"ActionsButtons"}>
      <div>
      {
        isAircraftOwned
        ? <Button
            type="button"
            handleClick={() => handlers.handleDelete(
                aircraft.id, aircraft.model, aircraft.variant)}
            style={"danger"}
          >
            DELETE
          </Button>
        : <SaveActionsButton
            aircraft={aircraft}
            aircraftsSaved={aircraftsSaved}
            handleAircraftSave={handlers.handleSave}
            handleAircraftUnsave={handlers.handleAircraftUnsave}
            disabled={getUserData() === null}
          />
      }
      </div>

      {/* TODO: test edit mode*/}
      {/* TODO: test clone */}
      <div>
      {
        isAircraftOwned
        ? <Button 
            type={isEditMode ? "reset" : "button"}
            handleClick={() => handlers.handleEditModeSwitch()}
            style={"primary"}
          >
            {isEditMode ? "VIEW" : "EDIT"}
          </Button>
        // TODO: if user not logged route to login
        : <Button 
            type="button"
            handleClick={() => handlers.handleCloning(aircraft)}
            disabled={getUserData() === null}
            style={"primary"}
          >
            CLONE
          </Button>
      }
      </div>

      <div>
      {
        isEditMode
        ? <Button type="submit" style={"primary"}>
            SUBMIT
          </Button>
        : <Button 
            type="button"
            handleClick={() => handlers.handleSelect(aircraft)}
            style={"primary"}
          >
            SELECT
          </Button>
      }
      </div>
    </div>
  );
};

export default AircraftActionsButtons;
