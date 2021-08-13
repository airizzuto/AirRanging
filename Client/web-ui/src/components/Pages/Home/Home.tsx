import React, { useState } from "react";
import { useModalClose } from "../../../hooks/useModalClose";
import { faMap, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import ModalTab from "../../Buttons/ModalTab";
import DraggableModal from "../../Modals/DraggableModal";
import PlanningModal from "./PlanningModal";

import { AircraftData, AircraftState } from "../../../types/Aircraft/Aircraft";

import Style from "./Home.module.scss";
import AircraftSelect from "./AircraftSelectModal";
// import InfoFooter from "./InfoFooter";

interface Props {
  aircrafts: AircraftData[];
  selectedAircraft: AircraftState | null;
  handleAircraftSelection: (selected: AircraftData | null) => void ;
  handleAircraftsFiltering: (filter: string) => void;
  handleAircraftState: React.Dispatch<React.SetStateAction<AircraftState | null>>;
}

const Home: React.FC<Props> = ({
  aircrafts,
  selectedAircraft,
  handleAircraftSelection,
  handleAircraftsFiltering,
  handleAircraftState
}) => {
  const [isModalActive, setIsModalActive] = useState(true); // One active modal at once
  const [displayPlanningModal, setDisplayPlanningModal] = useState(false);
  const [displayAircraftsModal, setDisplaySelectionModal] = useState(true);


  // TODO: move to a custom hook?
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
        handleClose={() => useModalClose(setDisplayPlanningModal)}
      >
        <PlanningModal 
          handleAccept={() => useModalClose(setDisplayPlanningModal)}
          aircraft={selectedAircraft}
          aircraftState={handleAircraftState}
        />
      </DraggableModal>

      <DraggableModal 
        show={displayAircraftsModal}
        label="Selection"
        handleClose={() => useModalClose(setDisplaySelectionModal)}
      >
        <AircraftSelect 
          aircraftSelected={selectedAircraft} 
          aircrafts={aircrafts}
          handleAircraftSelection={handleAircraftSelection}
          handleAircraftsFiltering={handleAircraftsFiltering}/>
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
