import React, { useEffect, useState } from "react";
import { useModalClose } from "../../../hooks/useModalClose";
import { faMap, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import ModalTab from "../../Generics/Buttons/ModalTab";
import DraggableModal from "../../Generics/Modals/DraggableModal";
import PlanningModal from "./PlanningModal";
import { Filters } from "../../../types/Aircraft/Filter";

import { AircraftWithSocials, AircraftState } from "../../../types/Aircraft/Aircraft";

import Style from "./Home.module.scss";
import AircraftSelect from "./AircraftSelectModal";
// import InfoFooter from "./InfoFooter";

interface Props {
  initialAircrafts: AircraftWithSocials[];
  currentAircrafts: AircraftWithSocials[];
  selectedAircraft: AircraftState | null;
  filters: Filters;
  handleAircraftSelection: (selected: AircraftWithSocials | null) => void ;
  handleAircraftsFilters: (filter: Filters) => Promise<void>;
  handleAircraftState: React.Dispatch<React.SetStateAction<AircraftState | null>>;
}

const Home: React.FC<Props> = ({
  initialAircrafts,
  currentAircrafts,
  selectedAircraft,
  filters,
  handleAircraftSelection,
  handleAircraftsFilters,
  handleAircraftState
}) => {
  const [isModalActive, setIsModalActive] = useState(false); // One active modal at once
  const [displayPlanningModal, setDisplayPlanningModal] = useState(false);
  const [displayAircraftsModal, setDisplaySelectionModal] = useState(false);

  useEffect(() => {
    if (!selectedAircraft) {
      setIsModalActive(true);
      setDisplaySelectionModal(true);
    }
  }, [selectedAircraft]);

  const handleModalDisplay = (
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
    display: boolean
  ) => {
    if (isModalActive) {
      setDisplayPlanningModal(false);
      setDisplaySelectionModal(false);
    }

    setDisplayModal(display ? false : true);
    setIsModalActive(true);
  };

  return (
    <div className={Style.Home}>

      {/* Properties Modals Activation Tabs */}
      <div className={Style.ModalTabs}>
        <ModalTab
          icon={faMap}
          handleTabClick={() => handleModalDisplay(
            setDisplayPlanningModal, displayPlanningModal
          )}
        />

        <ModalTab
          icon={faPaperPlane}
          handleTabClick={() => handleModalDisplay(
            setDisplaySelectionModal, displayAircraftsModal
          )}
        />
      </div>

      {/* Map View Properties Modals */}
      <DraggableModal 
        show={displayPlanningModal}
        
        label="Planning"
        // eslint-disable-next-line react-hooks/rules-of-hooks
        handleClose={() => useModalClose(setDisplayPlanningModal)}
      >
        <PlanningModal 
          // eslint-disable-next-line react-hooks/rules-of-hooks
          handleAccept={() => useModalClose(setDisplayPlanningModal)}
          aircraft={selectedAircraft}
          aircraftState={handleAircraftState}
        />
      </DraggableModal>

      <DraggableModal 
        show={displayAircraftsModal}
        label="Selection"
        // eslint-disable-next-line react-hooks/rules-of-hooks
        handleClose={() => useModalClose(setDisplaySelectionModal)}
      >
        <AircraftSelect 
          initialAircrafts={initialAircrafts}
          currentAircrafts={currentAircrafts}
          aircraftSelected={selectedAircraft}
          filters={filters}
          handleAircraftSelection={handleAircraftSelection}
          handleAircraftsFilters={handleAircraftsFilters}
          handleSelectClick={() => handleModalDisplay(setDisplayPlanningModal, displayPlanningModal)}
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
