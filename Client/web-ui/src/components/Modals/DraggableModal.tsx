import Draggable from "react-draggable";

import ExitButton from "../Buttons/ExitButton";

import Style from "./DraggableModal.module.scss";

interface Props {
  label: string,
  handleClose: () => void,
  show: boolean,
  children: JSX.Element
}

// TODO: Draggable bounds, dragabble area
const Modal = ({ label, handleClose, show, children }: Props): JSX.Element => {
  const showHideClassName = show ? {display: "block"} : {display: "none"};

  return (
    <Draggable
      bounds="parent"
      handle="#modalHeader"
      defaultPosition={{x: 200, y: 50}}
    >
      <div className={Style.Modal} style={showHideClassName}>
        <div className={Style.ModalHeader} id="modalHeader">
          <h1 className={Style.ModalTitle}>{label}</h1>
          <div className={Style.CloseButton}>
            <ExitButton handleClick={handleClose} />
          </div>
        </div>
        <hr className={Style.Separator}/>
        <div className={Style.ModalContent}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Modal;
