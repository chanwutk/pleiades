import React, { useState } from 'react';
import { PopupEditor } from './PopupEditor';

export interface INewSpecProps {
  onAdd: (txt: string) => boolean;
}

export const NewSpec: React.FC<INewSpecProps> = ({ onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');
  const [currentShownSpec, setCurrentShownSpec] = useState('');

  const handleClick = () => {
    setShowModal(true);
  };

  const handleClose = (toSave: boolean) => {
    if (toSave) {
      if (onAdd(currentShownSpec)) {
        setCurrentSpec(currentShownSpec);
        setShowModal(false);
      }
    } else {
      setCurrentShownSpec(currentSpec);
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="button-group">
        <button id="btn-newspec" onClick={handleClick}>+</button>
      </div>
      <PopupEditor
        isOpen={showModal}
        contentLabel="New Spec"
        onClose={handleClose}
        value={currentShownSpec}
        setValue={txt => setCurrentShownSpec(txt)}
      />
    </>
  );
};
