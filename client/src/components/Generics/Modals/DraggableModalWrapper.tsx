import React, { ReactElement } from "react";
import Draggable from "react-draggable";

import Style from "./Modal.module.scss";

interface Props {
  isActive: boolean;
  children: ReactElement | Array<ReactElement>;
}

// TODO: Draggable bounds, dragabble area
const DraggableModalWrapper: React.FC<Props> = ({isActive, children }) => {
  const showHideClassName = isActive ? {display: "block"} : {display: "none"};

  return (
    <Draggable
      bounds=""
      handle="#modalHeader"
      defaultPosition={{x: 100, y: 50}}
    >
      <div className={Style.Container} style={showHideClassName}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableModalWrapper;
