import React, { useState } from 'react';
import { PopupEditor } from './PopupEditor';

export interface INewSpecProps {
  onAdd: (txt: string) => Either<null, string>;
}

export const NewSpec: React.FC<INewSpecProps> = ({ onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleOpen = () => {
    // TODO: do we want to reset the editor to blank every time we click new spec?
    // if so, move setCurrentSpec('') below here instead.
    setShowModal(true);
  };

  const handleClose = (toSave: boolean) => {
    if (toSave) {
      const result = onAdd(currentSpec);
      switch (result.tag) {
        case 'success':
          setErrorMsg('');
          setCurrentSpec('');
          setShowModal(false);
          break;
        case 'failure':
          setErrorMsg(result.value);
          break;
      }
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="button-group">
        <button id="btn-newspec" onClick={handleOpen}>
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>
      <PopupEditor
        isOpen={showModal}
        contentLabel="New Spec"
        onClose={handleClose}
        value={currentSpec}
        setValue={setCurrentSpec}
        errorMsg={errorMsg}
      />
    </>
  );
};
