import React from "react";
import { useModalClose } from "../../../hooks/useModalClose";
import { faMap, faPaperPlane } from "@fortawesome/free-regular-svg-icons";

// import Map from "./Map";
import ModalTab from "../../Buttons/ModalTab";
import DraggableModal from "../../Modals/DraggableModal";

import Style from "./MapView.module.scss";
// import InfoFooter from "./InfoFooter";
import PlanningModal from "./Planning";

const MapView = (): JSX.Element => {
  const [isModalActive, setIsModalActive] = React.useState(false); // One active modal at once
  const [displayPlanningModal, setDisplayPlanningModal] = React.useState(false);
  const [displayAircraftsModal, setDisplayAircraftsModal] = React.useState(false);

  /* TODO: Aircraft selected states here */

  // TODO: abstract modal toggle states parameters (array of states?)
  const handleModalDisplay = (
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
    display: boolean
  ) => {
    if (isModalActive) {
      setDisplayPlanningModal(false);
      setDisplayAircraftsModal(false);
    }

    setDisplayModal(display ? false : true);
    setIsModalActive(true);
  };

  return (
    <div className={Style.MapView}>

      {/* Main Map View */}
      {/* <Map /> */}

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
            setDisplayAircraftsModal, displayAircraftsModal
          )}
        />
      </div>

      {/* Map View Properties Modals */}
      <DraggableModal 
        show={displayPlanningModal}
        label="Planning"
        handleClose={() => useModalClose(setDisplayPlanningModal)}
      >
        <PlanningModal handleAccept={() => useModalClose(setDisplayPlanningModal)}/>
      </DraggableModal>

      <DraggableModal 
        show={displayAircraftsModal}
        label="Aircrafts"
        handleClose={() => useModalClose(setDisplayAircraftsModal)}
      >
        {/* TODO: AIRCRAFT SELECT COMPONENT */}
        <div>AIRCRAFTS PLACEHOLDER</div>
      </DraggableModal>

      {/* <div className={Style.Info}>
        <InfoFooter />
      </div> */}

    </div>
  );
};

export default MapView;
