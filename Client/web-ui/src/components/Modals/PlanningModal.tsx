import React, { useState } from "react";
import ReactModal from "react-modal";

import ExitButton from "../Buttons/ExitButton";
import Style from "../Modals/PlanningModal.module.scss";


const PlanningModal = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(false);
  }

  return (
    <ReactModal 
      className={Style.PlanningModal}
      isOpen={showModal}
      contentLabel="Planning"
      shouldCloseOnEsc={false}
    >
      <h1>Planning</h1>
      <ExitButton handleClick={handleClose}/>
    </ReactModal>
  );
};

export default PlanningModal;
