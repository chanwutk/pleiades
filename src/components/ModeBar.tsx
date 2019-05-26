import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Grid from '@material-ui/core/Grid';

interface IModeBarProps {
  onUndo: () => void;
  onRedo: () => void;
}

export const ModeBar: React.FC<IModeBarProps> = ({ onUndo, onRedo }) => {
  const [currentMode, setCurrentMode] = useState('');
  return (
    <Grid container justify="space-between">
      <Grid item>
        <Button onClick={() => {}}>Layer</Button>
        <Button onClick={() => {}}>Concat</Button>
        <Button onClick={() => {}}>Repeat</Button>
        <Button onClick={() => {}}>Facet</Button>
      </Grid>
      <Grid item>
        <Button onClick={onUndo}>
          <Undo /> &nbsp; Undo
        </Button>
        <Button onClick={onRedo}>
          <Redo /> &nbsp; Redo
        </Button>
      </Grid>
    </Grid>
  );
};
