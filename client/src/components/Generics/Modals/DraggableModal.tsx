import Draggable from "react-draggable";

import Style from "./DraggableModal.module.scss";
import ModalHeader from "./ModalHeader";

interface Props {
  sectionName: string;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
  show: boolean;
  children: React.ReactElement
}

// TODO: Draggable bounds, dragabble area
const Modal: React.FC<Props> = ({ sectionName, handleClose, show, children }) => {
  const showHideClassName = show ? {display: "block"} : {display: "none"};

  return (
    <Draggable
      bounds=""
      handle="#modalHeader"
      defaultPosition={{x: 100, y: 50}}
    >
      <div className={Style.Modal} style={showHideClassName}>
        <ModalHeader
          headerTitle={sectionName}
          handleClose={handleClose}
        />

        <div className={Style.ModalContent}>
          {children}
        </div>
      </div>
    </Draggable>
  );
};

export default Modal;
