import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Grid from '@material-ui/core/Grid';

import { AppDispatch } from '../contexts';

export const ModeBar: React.FC = () => {
  const [currentMode, setCurrentMode] = useState('');

  const dispatch = useContext(AppDispatch);

  const handleUndo = () => dispatch({ type: 'undo' });
  const handleRedo = () => dispatch({ type: 'redo' });

  return (
    <Grid container justify="space-between">
      <Grid item>
        <Button onClick={() => {}}>Layer</Button>
        <Button onClick={() => {}}>Concat</Button>
        <Button onClick={() => {}}>Repeat</Button>
        <Button onClick={() => {}}>Facet</Button>
      </Grid>
      <Grid item>
        <Button onClick={handleUndo}>
          <Undo /> &nbsp; Undo
        </Button>
        <Button onClick={handleRedo}>
          <Redo /> &nbsp; Redo
        </Button>
      </Grid>
    </Grid>
  );
};
