import React from "react";

import { AircraftSelected, AircraftWithSocials } from "../../../types/Aircraft/Aircraft";

import { Button } from "../../Generics/Buttons/Button";
import ModalHeader from "../../Generics/Modals/ModalHeader";
import DraggableModalWrapper from "../../Generics/Modals/DraggableModalWrapper";

import Style from "./Planning.module.scss";
import PlanningSelection from "./PlanningSelection";
import PlanningInputs from "./PlanningInputs";

interface Props {
  handleAircraftState: React.Dispatch<React.SetStateAction<AircraftSelected | null>>;
  aircraftsSaved: AircraftWithSocials[] | null;
  aircraftSelected: AircraftSelected | null;
  show: boolean;
  handleModalClose: React.MouseEventHandler<HTMLButtonElement>;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAccept: () => void;
}

const PlanningModal: React.FC<Props> = ({
  aircraftSelected,
  aircraftsSaved,
  show,
  handleModalClose,
  handleAircraftState,
  handleAircraftSelection,
  handleAircraftSave,
  handleAircraftUnsave,
  handleAccept,
}) => {
  return (
    <DraggableModalWrapper isActive={show}>
      <div className={Style.Container}>
        <ModalHeader
          headerTitle={"Planning"}
          handleClose={handleModalClose}
        />

        <PlanningSelection
          aircraftsSaved={aircraftsSaved}
          aircraftSelected={aircraftSelected}
          handleAircraftSelection={handleAircraftSelection}
          handleAircraftSave={handleAircraftSave}
          handleAircraftUnsave={handleAircraftUnsave}
        />

        <PlanningInputs
          aircraftSelected={aircraftSelected}
          handleAircraftState={handleAircraftState}
        />

        <div className={Style.Accept}>
          <Button handleClick={handleAccept} style="primary">
            ACCEPT
          </Button>
        </div>
      </div>
    </DraggableModalWrapper>
  );
};

export default PlanningModal;
