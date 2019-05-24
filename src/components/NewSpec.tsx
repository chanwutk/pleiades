import React, { useState } from 'react';
import { PopupEditor } from './PopupEditor';

export interface INewSpecProps {
  onAdd: (txt: string) => boolean;
}

export const NewSpec: React.FC<INewSpecProps> = ({ onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');

  const handleOpen = () => {
    // TODO: do we want to reset the editor to blank every time we click new spec?
    // if so, move setCurrentSpec('') below here instead.
    setShowModal(true);
  };

  const handleClose = (toSave: boolean) => {
    if (toSave) {
      const isSuccessful = onAdd(currentSpec);
      if (isSuccessful) {
        setCurrentSpec('');
        setShowModal(false);
      }
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="button-group">
        <button id="btn-newspec" onClick={handleOpen}>+</button>
      </div>
      <PopupEditor
        isOpen={showModal}
        contentLabel="New Spec"
        onClose={handleClose}
        value={currentSpec}
        setValue={setCurrentSpec}
      />
    </>
  );
};
