import React from 'react';
import { Button } from '../Buttons/Button';

import Style from "./ModalFooter.module.scss";

interface Props {
  handleAccept: () => void;
}

const ModalFooter: React.FC<Props> = ({handleAccept}) => {
  return (
    <div className={Style.Accept}>
      <Button handleClick={handleAccept} style="primary">
        ACCEPT
      </Button>
    </div>
  );
};

export default ModalFooter;
