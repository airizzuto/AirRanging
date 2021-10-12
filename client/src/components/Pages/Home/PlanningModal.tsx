import React from "react";

import { AircraftSelected, AircraftWithSocials } from "../../../types/Aircraft/Aircraft";
import { Filters } from "../../../types/Aircraft/Filter";

import { Button } from "../../Generics/Buttons/Button";
import ModalHeader from "../../Generics/Modals/ModalHeader";
import DraggableModalWrapper from "../../Generics/Modals/DraggableModalWrapper";

import Style from "./Planning.module.scss";
import PlanningSelection from "./PlanningSelection";
import PlanningInputs from "./PlanningInputs";

interface Props {
  handleAircraftState: React.Dispatch<React.SetStateAction<AircraftSelected | null>>;
  initialAircrafts: AircraftWithSocials[];
  currentAircrafts: AircraftWithSocials[];
  aircraftsSaved: AircraftWithSocials[] | null;
  aircraftSelected: AircraftSelected | null;
  filters: Filters;
  show: boolean;
  handleModalClose: React.MouseEventHandler<HTMLButtonElement>;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void;
  handleAircraftsFilters: (filter: Filters) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAccept: () => void;
}

const PlanningModal: React.FC<Props> = ({
  initialAircrafts,
  currentAircrafts,
  aircraftSelected,
  aircraftsSaved,
  filters,
  show,
  handleModalClose,
  handleAircraftState,
  handleAircraftSelection,
  handleAircraftsFilters,
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
          initialAircrafts={initialAircrafts}
          currentAircrafts={currentAircrafts}
          aircraftsSaved={aircraftsSaved}
          aircraftSelected={aircraftSelected}
          filters={filters}
          handleAircraftSelection={handleAircraftSelection}
          handleAircraftsFilters={handleAircraftsFilters}
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
