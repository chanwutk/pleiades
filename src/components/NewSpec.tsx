import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { VegaLiteEditor } from './VegaLiteEditor';

const useStyles = makeStyles(theme => ({
  button: { marginBottom: theme.spacing(1) },
}));

export const NewSpec: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');
  const [currentAlias, setCurrentAlias] = useState('');

  const dispatch = useDispatch();

  const handleSuccess = (alias: string, json: IRawSpec) => {
    dispatch({ type: 'add-spec', json, alias });
  };

  const handleOpen = () => {
    setCurrentSpec('');
    setCurrentAlias('Untitled');
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
        onSuccess={handleSuccess}
        value={currentSpec}
        setValue={setCurrentSpec}
        alias={currentAlias}
        setAlias={setCurrentAlias}
      />
    </>
  );
};
