import React from "react";

import { AircraftSelected, AircraftWithSocials } from "../../types/Aircraft/Aircraft";

import DraggableModalWrapper from "../Generics/Modals/DraggableModalWrapper";
import ModalHeader from "../Generics/Modals/ModalHeader";
import ModalFooter from "../Generics/Modals/ModalFooter";

import AircraftModalSelection from "./AircraftModalSelection";
import AircraftModalInputs from "./AircraftModalInputs";

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

const AircraftModal: React.FC<Props> = ({
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
      <ModalHeader
        headerTitle={"AIRCRAFT"}
        handleClose={handleModalClose}
      />

      <AircraftModalSelection
        aircraftsSaved={aircraftsSaved}
        aircraftSelected={aircraftSelected}
        handleAircraftSelection={handleAircraftSelection}
        handleAircraftSave={handleAircraftSave}
        handleAircraftUnsave={handleAircraftUnsave}
      />

      <AircraftModalInputs
        aircraftSelected={aircraftSelected}
        handleAircraftState={handleAircraftState}
      />

      <ModalFooter handleAccept={handleAccept}/>
    </DraggableModalWrapper>
  );
};

export default AircraftModal;
