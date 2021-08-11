import React, { useState } from "react";
import { useModalClose } from "../../../hooks/useModalClose";
import { faMap, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

import ModalTab from "../../Buttons/ModalTab";
import DraggableModal from "../../Modals/DraggableModal";
import PlanningModal from "./Planning";

import { AircraftState } from "../../../types/Aircraft/Aircraft";

import Style from "./Home.module.scss";
import AircraftSelect from "./AircraftSelect";
// import InfoFooter from "./InfoFooter";

const Home = () => {
  const [isModalActive, setIsModalActive] = useState(true); // One active modal at once
  const [displayPlanningModal, setDisplayPlanningModal] = useState(false);
  const [displayAircraftsModal, setDisplaySelectionModal] = useState(true);

  const [aircraft, setAircraft] = useState<AircraftState | null>(null);

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
          aircraft={aircraft}
          aircraftState={setAircraft}
        />
      </DraggableModal>

      <DraggableModal 
        show={displayAircraftsModal}
        label="Selection"
        handleClose={() => useModalClose(setDisplaySelectionModal)}
      >
        <AircraftSelect aircraftSelected={aircraft}/>
      </DraggableModal>

      {/* <div className={Style.Info}>
        <InfoFooter />
      </div> */}

    </div>
  );
};

export default Home;
