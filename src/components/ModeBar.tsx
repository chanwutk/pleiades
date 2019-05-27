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
  const handleSelectMode = (mode: Mode) =>
    dispatch({ type: 'select-mode', mode });

  return (
    <Grid container justify="space-between">
      <Grid item>
        <Button onClick={() => handleSelectMode('layer')} disabled={!!mode}>
          Layer
        </Button>
        <Button onClick={() => handleSelectMode('concat')} disabled={!!mode}>
          Concat
        </Button>
        <Button onClick={() => handleSelectMode('repeat')} disabled={!!mode}>
          Repeat
        </Button>
        <Button onClick={() => handleSelectMode('facet')} disabled={!!mode}>
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
