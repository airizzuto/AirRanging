import React from 'react';

import { Coordinates } from '../../types/Map/MapTypes';

import DraggableModalWrapper from '../Generics/Modals/DraggableModalWrapper';
import ModalFooter from '../Generics/Modals/ModalFooter';
import ModalHeader from '../Generics/Modals/ModalHeader';

import PlanningModalSelection from './PlanningModalSelection';

interface Props {
  show: boolean;
  points: Coordinates[];
  handleModalClose: React.MouseEventHandler<HTMLButtonElement>;
  handleAccept: () => void;
}

const PlanningModal: React.FC<Props> = ({
  show,
  points,
  handleModalClose,
  handleAccept
}) => {
  return (
    <DraggableModalWrapper isActive={show}>
      <ModalHeader headerTitle='PLANNING' handleClose={handleModalClose}/>
      <PlanningModalSelection points={points}/>
      <ModalFooter handleAccept={handleAccept}/>
    </DraggableModalWrapper>
  );
};

export default PlanningModal;
