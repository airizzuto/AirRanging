import React from "react";

import Style from "./MapView.module.scss"
import ModalTab from "./ModalTab";
import Modal from "../Modals/Modal";

const MapView = (): JSX.Element => {
  const [displayPlanningModal, setDisplayPlanningModal] = React.useState(true);
  const [displayAircraftsModal, setDisplayAircraftsModal] = React.useState(false);

  const handleModalDisplay = (
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>,
    display: boolean
  ) => {
    setDisplayModal(display ? false : true);
  }

  const handleModalClose = (
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setDisplayModal(false);
  }

  return(
    <div className={Style.MapView} id="mainview">
      <div className={Style.ModalTabs}>
        <ModalTab
          label={"Planning"}
          handleTabClick={() => handleModalDisplay(
            setDisplayPlanningModal, displayPlanningModal
          )}
        />
        <ModalTab
          label={"Aircrafts"}
          handleTabClick={() => handleModalDisplay(
            setDisplayAircraftsModal, displayAircraftsModal
          )} 
        />
        
      </div>
      
      <div className={Style.Modals}>
        <Modal 
          show={displayPlanningModal}
          label="Planning"
          handleClose={() => handleModalClose(setDisplayPlanningModal)} 
          children={
            <div>PLANNING PLACEHOLDER</div>
          }
        />
        <Modal 
          show={displayPlanningModal}
          label="Aircrafts"
          handleClose={() => handleModalClose(setDisplayAircraftsModal)} 
          children={
            <div>AIRCRAFTS PLACEHOLDER</div>
          }/>
      </div>
    </div>
  )
}

export default MapView;
