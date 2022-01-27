import React from 'react';

import DraggableModalWrapper from '../Generics/Modals/DraggableModalWrapper';
import ModalFooter from '../Generics/Modals/ModalFooter';
import ModalHeader from '../Generics/Modals/ModalHeader';

import PlanningModalSelection from './PlanningModalSelection';

interface Props {
  show: boolean;
  handleModalClose: React.MouseEventHandler<HTMLButtonElement>;
  handleAccept: () => void;
}

const PlanningModal: React.FC<Props> = ({
  show,
  handleModalClose,
  handleAccept
}) => {
  return (
    <DraggableModalWrapper isActive={show}>
      <ModalHeader headerTitle='PLANNING' handleClose={handleModalClose}/>
      <PlanningModalSelection />
      <ModalFooter handleAccept={handleAccept}/>
    </DraggableModalWrapper>
  );
};

export default PlanningModal;
