import React from 'react';

import { Button } from '../Buttons/Button';

import Style from "./ModalHeader.module.scss";

interface Props {
  headerTitle: string;
  handleClose: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalHeader: React.FC<Props> = ({ headerTitle, handleClose }) => {
  return (
    <div className={Style.Container} id="modalHeader">
      <h1>{headerTitle}</h1>
  
      <Button handleClick={handleClose} style={"exit"}>
        X
      </Button>
    </div>
  );
};

export default ModalHeader;
