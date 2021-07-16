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
      defaultPosition={{x: 100, y: 100}}
      scale={1}
    >
      <div className={Style.Modal} style={showHideClassName}>
        <div className={Style.Header}>
          <h1>{label}</h1>
          <ExitButton handleClick={handleClose}/>
        </div>

        <div className={Style.Content}>
          {children}
        </div>
    </div>
    </Draggable>
  );
};

export default Modal;
