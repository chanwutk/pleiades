import React, { useState } from 'react';
import { VegaLiteEditor } from './VegaLiteEditor';
import { Plus } from 'react-feather';

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
      <div className="new-spec">
        <div className="fake-button" onClick={handleOpen}>
          <Plus className="preview-icon" />
          &nbsp; Add a new spec
        </div>
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
