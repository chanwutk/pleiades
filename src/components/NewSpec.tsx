import React, { useState } from 'react';
import { Plus } from 'react-feather';
import { VegaLiteEditor } from './VegaLiteEditor';
import { FakeButton } from './FakeButton';

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
        <FakeButton onClick={handleOpen}>
          <Plus className="preview-icon" />
          &nbsp; New Spec
        </FakeButton>
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
