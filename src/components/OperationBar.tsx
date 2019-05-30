import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Grid from '@material-ui/core/Grid';

export const OperationBar: React.FC = () => {
  const dispatch = useDispatch();
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const tree = useSelector((state: IGlobalState) => state.current.tree);
  const undoDisabled = useSelector(
    (state: IGlobalState) => state.undoStack.length === 0
  );
  const redoDisabled = useSelector(
    (state: IGlobalState) => state.redoStack.length === 0
  );

  const handleUndo = () => dispatch({ type: 'undo' });
  const handleRedo = () => dispatch({ type: 'redo' });
  const operate = (operator: Operator) => {
    // make sure that disabled functions properly, and we won't need to
    // write a check here
    dispatch({ type: 'operate', operands, operator });
  };

  const navBarOperands = operands.filter(x => x < 0);
  const mainViewOperands = operands.filter(x => x > 0);

  const layerDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length !== 1;
  const concatDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length !== 1;
  const repeatDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length > 0;
  const facetDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length > 0;
  const placeDisabled =
    tree !== null || mainViewOperands.length > 0 || navBarOperands.length !== 1;

  return (
    <Grid container justify="space-between">
      <Grid item>
        <Button onClick={() => operate('layer')} disabled={layerDisabled}>
          Layer
        </Button>
        <Button onClick={() => operate('concat')} disabled={concatDisabled}>
          Concat
        </Button>
        <Button onClick={() => operate('repeat')} disabled={repeatDisabled}>
          Repeat
        </Button>
        <Button onClick={() => operate('facet')} disabled={facetDisabled}>
          Facet
        </Button>
        <Button onClick={() => operate('place')} disabled={placeDisabled}>
          Place
        </Button>
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
