import React, { ReactElement } from "react";
import Draggable from "react-draggable";
import { displayComponent } from "../../../utils/displayComponent";

import Style from "./Modal.module.scss";

interface Props {
  isActive: boolean;
  children: ReactElement | Array<ReactElement>;
}

// TODO: Draggable bounds, dragabble area
const DraggableModalWrapper: React.FC<Props> = ({isActive, children }) => {
  return (
    <Draggable
      bounds=""
      handle="#modalHeader"
      defaultPosition={{x: 80, y: 10}}
    >
      <div className={Style.Container} style={displayComponent(isActive)}>
        {children}
      </div>
    </Draggable>
  );
};

export default DraggableModalWrapper;
