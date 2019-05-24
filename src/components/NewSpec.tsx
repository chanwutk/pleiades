import React, { useState } from 'react';
import { VegaLiteEditor } from './VegaLiteEditor';

export interface INewSpecProps {
  onAdd: (json: any) => void;
}

export const NewSpec: React.FC<INewSpecProps> = ({ onAdd }) => {

  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');

  const handleOpen = () => {
    setCurrentSpec('');
    setShowModal(true);
  };

  return (
    <>
      <div className="button-group">
        <button id="btn-newspec" onClick={handleOpen}>
          <i className="fas fa-plus-circle"></i>
        </button>
      </div>
      <VegaLiteEditor
        showModal={showModal}
        setShowModal={setShowModal}
        contentLabel="New Spec"
        onSuccess={onAdd}
        value={currentSpec}
        setValue={setCurrentSpec}
      />
    </>
  );
};
