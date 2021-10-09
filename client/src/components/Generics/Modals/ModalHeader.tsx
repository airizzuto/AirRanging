import React from 'react';

import { Button } from '../Buttons/Button';

import Style from "./ModalHeader.module.scss";

interface Props {
  headerTitle: string;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalHeader: React.FC<Props> = ({ headerTitle, handleClose }) => {
  return (
    <div className={Style.ModalHeader} id="modalHeader">
      <h1 className={Style.ModalTitle}>{headerTitle}</h1>
  
      <div className={Style.CloseButton}>
        <Button handleClick={handleClose} style={"exit"}>
          X
        </Button>
      </div>
    </div>
  );
};

export default ModalHeader;
