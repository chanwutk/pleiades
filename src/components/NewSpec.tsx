import React, { useState } from 'react';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import { VegaLiteEditor } from './VegaLiteEditor';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

export interface INewSpecProps {
  onAdd: (alias: string, json: any) => void;
}

const useStyles = makeStyles(theme => ({
  button: { marginBottom: theme.spacing(1) }
}));

export const NewSpec: React.FC<INewSpecProps> = ({ onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');
  const [currentAlias, setCurrentAlias] = useState('');

  const handleOpen = () => {
    setCurrentSpec('');
    setCurrentAlias('');
    setShowModal(true);
  };

  const classes = useStyles();

  return (
    <>
      <Button onClick={handleOpen} className={classes.button}>
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
