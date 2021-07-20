import React from "react";

import Style from "./MapView.module.scss";

import Map from "./Map";
import ModalTab from "./ModalTab";
import Modal from "./PropertiesModals/PropertiesModal";

const MapView = (): JSX.Element => {
  const [isModalActive, setIsModalActive] = React.useState(false); // TODO
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
  }

  const handleModalClose = (
    setDisplayModal: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setDisplayModal(false);
  }

  return(
    <div className={Style.MapView} id="mapview">
            
      <div className={Style.Map}>
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

      <div className={Style.Modals}>
        <Modal 
          show={displayPlanningModal}
          label="Planning"
          handleClose={() => handleModalClose(setDisplayPlanningModal)} 
          children={
            <div>PLANNING PLACEHOLDER</div>

            /*TODO: Form */
          }
        />
        <Modal 
          show={displayAircraftsModal}
          label="Aircrafts"
          handleClose={() => handleModalClose(setDisplayAircraftsModal)} 
          children={
            <div>AIRCRAFTS PLACEHOLDER</div>
          }/>
      </div>

      <div className={Style.InfoFooter}>
        INFO PLACEHOLDER
      </div>
    </div>
  )
}

export default MapView;
