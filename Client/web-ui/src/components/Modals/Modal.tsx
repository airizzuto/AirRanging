import React from "react";
import Draggable from "react-draggable";

import ExitButton from "../Buttons/ExitButton";

import Style from "./Modal.module.scss";

interface Props {
  label: string,
  handleClose: () => void,
  show: boolean,
  children: JSX.Element
}


const Modal = ({ label, handleClose, show, children }: Props): JSX.Element => {
  const showHideClassName = show ? {display: "block"} : {display: "none"};

  return (
    <Draggable
      axis="both"
      handle=".ModalHeader"
      defaultPosition={{x: 200, y: 50}}
      scale={1}
    >
      <div className={Style.Modal} style={showHideClassName}>
        <div className={Style.ModalHeader}>
          <h1 className={Style.ModalTitle}>{label}</h1>
          <ExitButton handleClick={handleClose}/>
        </div>

        <div className={Style.ModalContent}>
          {children}
        </div>
    </div>
    </Draggable>
  );
};

export default Modal;
