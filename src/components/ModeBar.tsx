import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Grid from '@material-ui/core/Grid';
import { Mode, State } from '../global';

interface IModeBarProps {
  onUndo: () => void;
  onRedo: () => void;
  onSelectMode: (mode: Mode) => void;
  state: State;
}

export const ModeBar: React.FC<IModeBarProps> = ({ onUndo, onRedo, onSelectMode, state }) => {
  return (
    <Grid container justify="space-between">
      <Grid item>
        <Button
          onClick={() => onSelectMode("layer")}
          disabled={!!state.mode}
        >Layer</Button>
        <Button
          onClick={() => onSelectMode("concat")}
          disabled={!!state.mode}
        >Concat</Button>
        <Button
          onClick={() => onSelectMode("repeat")}
          disabled={!!state.mode}
        >Repeat</Button>
        <Button
          onClick={() => onSelectMode("facet")}
          disabled={!!state.mode}
        >Facet</Button>
      </Grid>
      <Grid item>
        <Button onClick={onUndo}>
          <Undo /> &nbsp; Undo
        </Button>
        <Button onClick={onRedo}>
          <Redo /> &nbsp; Redo
        </Button>
      </Grid>
    </Grid >
  );
};
