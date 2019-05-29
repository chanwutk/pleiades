import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Grid from '@material-ui/core/Grid';

import { AppDispatch } from '../contexts';

interface IModeBarProps {
  mode: Mode;
}

export const ModeBar: React.FC<IModeBarProps> = ({ mode }) => {
  const dispatch = useContext(AppDispatch);

  const handleUndo = () => dispatch({ type: 'undo' });
  const handleRedo = () => dispatch({ type: 'redo' });
  const handleSelectMode = (selectingMode: Mode) => {
    dispatch({ type: 'select-mode', mode: selectingMode });
  };

  const disabled = mode !== null;

  return (
    <Grid container justify="space-between">
      <Grid item>
        <Button onClick={() => handleSelectMode('layer')} disabled={disabled}>
          Layer
        </Button>
        <Button onClick={() => handleSelectMode('concat')} disabled={disabled}>
          Concat
        </Button>
        <Button onClick={() => handleSelectMode('repeat')} disabled={disabled}>
          Repeat
        </Button>
        <Button onClick={() => handleSelectMode('facet')} disabled={disabled}>
          Facet
        </Button>
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
