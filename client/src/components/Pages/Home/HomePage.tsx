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
  handleAircraftsFiltering: (filter: string) => Promise<void>;
  handleAircraftState: React.Dispatch<React.SetStateAction<AircraftState | null>>;
}

const Home: React.FC<Props> = ({
  selectedAircraft,
  handleAircraftSelection,
  handleAircraftState
}) => {
  const [isModalActive, setIsModalActive] = useState(false); // One active modal at once
  const [displayPlanningModal, setDisplayPlanningModal] = useState(false);
  const [displayAircraftsModal, setDisplaySelectionModal] = useState(false);
  React.useEffect(() => {
    if (!selectedAircraft) {
      setIsModalActive(true);
      setDisplaySelectionModal(true);
    }
  }, []);

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
          aircraftSelected={selectedAircraft} 
          handleAircraftSelection={handleAircraftSelection}
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
