import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Grid from '@material-ui/core/Grid';
import { LayerButton } from './operations/LayerButton';
import { ConcatButton } from './operations/ConcatButton';
import { RepeatButton } from './operations/RepeatButton';
import { FacetButton } from './operations/FacetButton';
import { PlaceButton } from './operations/PlaceButton';

export const OperationBar: React.FC = () => {
  const dispatch = useDispatch();
  const undoDisabled = useSelector(
    (state: IGlobalState) => state.undoStack.length === 0
  );
  const redoDisabled = useSelector(
    (state: IGlobalState) => state.redoStack.length === 0
  );

  const handleUndo = () => dispatch({ type: 'undo' });
  const handleRedo = () => dispatch({ type: 'redo' });

  return (
    <Grid container justify="space-between">
      <Grid item>
        <LayerButton />
        <ConcatButton />
        <RepeatButton />
        <FacetButton />
        <PlaceButton />
      </Grid>
      <Grid item>
        <Button onClick={handleUndo} disabled={undoDisabled}>
          <Undo /> &nbsp; Undo
        </Button>
        <Button onClick={handleRedo} disabled={redoDisabled}>
          <Redo /> &nbsp; Redo
        </Button>
      </Grid>
    </Grid>
  );
};
