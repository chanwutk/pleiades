import React, { useState } from 'react';
import { SpecForm } from './SpecForm';

export interface INewSpecProps {
  onAdd: (txt: string) => void;
}

export const NewSpec: React.FC<INewSpecProps> = ({ onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');
  const [currentShownSpec, setCurrentShownSpec] = useState('');

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = (toSave: boolean) => {
    setShowModal(false);
    if (toSave) {
      setCurrentSpec(currentShownSpec);
      onAdd(currentShownSpec);
    } else {
      setCurrentShownSpec(currentSpec);
    }
  };

  return (
    <>
      <button id="btn-newspec" onClick={handleClick}>+</button>
      <SpecForm
        isOpen={showModal}
        contentLabel="New Spec"
        onClose={handleClose}
        spec={currentShownSpec}
        setSpec={setCurrentShownSpec}
      />
    </>
  );
};
