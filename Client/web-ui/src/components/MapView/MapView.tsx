import React from "react";

import Style from "./MapView.module.scss";

// import Map from "./Map";
import ModalTab from "./ModalTab";
import DraggableModal from "../Modals/DraggableModal";

const MapView = (): JSX.Element => {
  const [isModalActive, setIsModalActive] = React.useState(false); // One active modal at once
  const [displayPlanningModal, setDisplayPlanningModal] = React.useState(false);
  const [displayAircraftsModal, setDisplayAircraftsModal] = React.useState(false);

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

  const handleModalClose = (
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setDisplayModal(false);
  };

  return(
    <div className={Style.MapView}>
            
      <div className={Style.Map} id="mapview">
        {/* <Map /> */}
      </div>

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

      <DraggableModal 
        show={displayPlanningModal}
        label="Planning"
        handleClose={() => handleModalClose(setDisplayPlanningModal)}
      >
        <div>PLANNING PLACEHOLDER</div>
      </DraggableModal>
      <DraggableModal 
        show={displayAircraftsModal}
        label="Aircrafts"
        handleClose={() => handleModalClose(setDisplayAircraftsModal)}
      > 
        <div>AIRCRAFTS PLACEHOLDER</div>
      </DraggableModal>

      <div className={Style.InfoFooter}>
        INFO PLACEHOLDER
      </div>
    </div>
  );
};

export default MapView;
