import React from "react";
import { useModalClose } from "../../hooks/useModalClose";

// import Map from "./Map";
import ModalTab from "./ModalTab";
import DraggableModal from "../Modals/DraggableModal";

import Style from "./MapView.module.scss";
import InfoFooter from "./InfoFooter";
import PlanningModal from "./Planning";

const MapView = (): JSX.Element => {
  const [isModalActive, setIsModalActive] = React.useState(false); // One active modal at once
  const [displayPlanningModal, setDisplayPlanningModal] = React.useState(false);
  const [displayAircraftsModal, setDisplayAircraftsModal] = React.useState(false);

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
          label={"Plan"}
          handleTabClick={() => handleModalDisplay(
            setDisplayPlanningModal, displayPlanningModal
          )}
        />

        <ModalTab
          label={"Acft"}
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
        <PlanningModal />
      </DraggableModal>

      <DraggableModal 
        show={displayAircraftsModal}
        label="Aircrafts"
        handleClose={() => useModalClose(setDisplayAircraftsModal)}
      >
        {/* TODO: AIRCRAFT SELECT COMPONENT */}
        <div>AIRCRAFTS PLACEHOLDER</div>
      </DraggableModal>

      <div className={Style.Info}>
        <InfoFooter />
      </div>

    </div>
  );
};

export default MapView;
