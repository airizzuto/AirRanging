import React, { useState } from "react";
import { faMap, } from "@fortawesome/free-regular-svg-icons";

import ModalTab from "../../Generics/Buttons/ModalTab";
import DraggableModal from "../../Generics/Modals/DraggableModal";
import PlanningModal from "./PlanningModal";
import { Filters } from "../../../types/Aircraft/Filter";

import { AircraftWithSocials, AircraftSelected } from "../../../types/Aircraft/Aircraft";

import Style from "./Home.module.scss";
// import InfoFooter from "./InfoFooter";

interface Props {
  initialAircrafts: AircraftWithSocials[];
  currentAircrafts: AircraftWithSocials[];
  aircraftsSaved: AircraftWithSocials[] | null;
  selectedAircraft: AircraftSelected | null;
  filters: Filters;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void ;
  handleAircraftsFilters: (filter: Filters) => void;
  handleAircraftSave: (aircraftId: string) => Promise<void>;
  handleAircraftUnsave: (aircraftId: string) => Promise<void>;
  handleAircraftState: React.Dispatch<React.SetStateAction<AircraftSelected | null>>;
}

const Home: React.FC<Props> = ({
  initialAircrafts,
  currentAircrafts,
  aircraftsSaved,
  selectedAircraft,
  filters,
  handleAircraftSelection,
  handleAircraftsFilters,
  handleAircraftSave,
  handleAircraftUnsave,
  handleAircraftState
}) => {
  // const [isModalActive, setIsModalActive] = useState(true); // One active modal at once
  const [displayPlanningModal, setDisplayPlanningModal] = useState(true);


  return (
    <div className={Style.Home}>

      {/* Properties Modals Activation Tabs */}
      <div className={Style.ModalTabs}>
        <ModalTab
          icon={faMap}
          handleTabClick={() => setDisplayPlanningModal(!displayPlanningModal)}
        />
      </div>

      {/* Map View Properties Modals */}
      <DraggableModal 
        show={displayPlanningModal}
        
        label="Planning"
        // eslint-disable-next-line react-hooks/rules-of-hooks
        handleClose={() => setDisplayPlanningModal(false)}
      >
        <PlanningModal
          // eslint-disable-next-line react-hooks/rules-of-hooks
          initialAircrafts={initialAircrafts}
          currentAircrafts={currentAircrafts}
          aircraftsSaved={aircraftsSaved}
          aircraftSelected={selectedAircraft}
          filters={filters}
          handleAircraftState={handleAircraftState}
          handleAircraftSelection={handleAircraftSelection}
          handleAircraftsFilters={handleAircraftsFilters}
          handleAircraftSave={handleAircraftSave}
          handleAircraftUnsave={handleAircraftUnsave}
          handleAccept={() => setDisplayPlanningModal(false)}
        />
      </DraggableModal>

      {/* TODO:
      <div className={Style.Info}>
        <InfoOverlay />
      </div> 
      */}

    </div>
  );
};

export default Home;
