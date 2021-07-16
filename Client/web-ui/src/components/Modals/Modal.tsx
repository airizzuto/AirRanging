import React from "react";

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
    <div className={Style.Modal} style={showHideClassName}>
      <section className={Style.main}>
        <ExitButton handleClick={handleClose}/>
        <h1>{label}</h1>
        {children}
      </section>
    </div>
  );
};

export default Modal;
