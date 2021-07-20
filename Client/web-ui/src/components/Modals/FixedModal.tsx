import React from "react";

import ExitButton from "../Buttons/ExitButton";

import Style from "./FixedModal.module.scss";

interface Props {
  label: string,
  showModal: boolean,
  handleModalClose: () => void,
  children: JSX.Element
}

export default function Modal({
  label, showModal, handleModalClose, children
}: Props): JSX.Element {
  const showHideClassName = showModal ? { display: "block" } : { display: "none" };

  return (
    <div className={Style.Modal} style={showHideClassName}>
      <div className={Style.ModalMain}>
        <div className={Style.ModalHeader}>
          <h1 className={Style.ModalTitle}>{label}</h1>
          <div className={Style.CloseButton}>
            <ExitButton handleClick={handleModalClose} />
          </div>
        </div>
        <hr />
        <div className={Style.ModalContent}>
          {children}
        </div>
      </div>
    </div>
  );
}
