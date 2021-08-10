import Draggable from "react-draggable";

import ExitButton from "../Buttons/ExitButton";

import Style from "./DraggableModal.module.scss";

interface Props {
  label: string;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  show: boolean;
  children: React.ReactElement
}

// TODO: Draggable bounds, dragabble area
const Modal: React.FC<Props> = ({ label, handleClose, show, children }) => {
  const showHideClassName = show ? {display: "block"} : {display: "none"};

  return (
    <Draggable
      bounds=""
      handle="#modalHeader"
      defaultPosition={{x: 100, y: 50}}
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
