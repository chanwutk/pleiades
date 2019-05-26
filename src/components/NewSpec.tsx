import React, { useState } from 'react';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import { VegaLiteEditor } from './VegaLiteEditor';
import Button from '@material-ui/core/Button';

export interface INewSpecProps {
  onAdd: (alias: string, json: any) => void;
}

export const NewSpec: React.FC<INewSpecProps> = ({ onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');
  const [currentAlias, setCurrentAlias] = useState('');

  const handleOpen = () => {
    setCurrentSpec('');
    setCurrentAlias('');
    setShowModal(true);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <PlaylistAdd /> &nbsp; New Spec
      </Button>
      <VegaLiteEditor
        showModal={showModal}
        setShowModal={setShowModal}
        onSuccess={onAdd}
        value={currentSpec}
        setValue={setCurrentSpec}
        alias={currentAlias}
        setAlias={setCurrentAlias}
      />
    </>
  );
};
