import React from "react";
import useOnClickOutside from "../../hooks/useClickOutside";

import ExitButton from "../Buttons/ExitButton";

import Style from "./FixedModal.module.scss";

interface Props {
  label: string,
  visible: boolean,
  handleCloseModal: React.MouseEventHandler<HTMLButtonElement>,
  children: React.ReactElement
}

const Modal: React.FC<Props> = ({ label, visible, handleCloseModal, children }) => {
  const ref = React.useRef(null);

  const showHideClassName = visible ? { display: "grid" } : { display: "none" };

  useOnClickOutside(ref, () => handleCloseModal);

  return (
    <div className={Style.Modal} style={showHideClassName}>
      <div className={Style.ModalMain} ref={ref}>
        <div className={Style.ModalHeader}>
          <h1 className={Style.ModalTitle}>{label}</h1>
          <div className={Style.CloseButton}>
            <ExitButton handleClick={() => handleCloseModal} />
          </div>
        </div>

        <hr className={Style.Separator}/>

        <div className={Style.ModalContent}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
