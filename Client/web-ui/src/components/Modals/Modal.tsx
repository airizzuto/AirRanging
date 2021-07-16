import React from "react";

import ExitButton from "../Buttons/ExitButton";

import "./Modal.module.scss";

interface Props {
  label: string,
  handleClose: () => void,
  show: boolean,
  children: JSX.Element
}

const Modal = ({ label, handleClose, show, children }: Props): JSX.Element => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        <ExitButton handleClick={handleClose}/>
        <h1>{label}</h1>
        {children}
      </section>
    </div>
  );
};

export default Modal;
