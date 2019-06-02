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
import { makeStyles } from '@material-ui/core/styles';
import { ExportButton } from './operations/ExportButton';

export interface IOperationProps {
  navBarOperands: number[];
  mainViewOperands: number[];
  tree?: View | null;
}

export const useWarningStyles = makeStyles(() => ({
  buttonNormal: {},
  buttonWarn: {
    '&:hover': {
      backgroundColor: '#ffd800',
    },
  },
  error: {
    width: 22,
    height: 22,
    color: '#ed1c1c',
  },
}));

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

  const navBarOperands = operands.filter(x => x < 0);
  const mainViewOperands = operands.filter(x => x > 0);

  return (
    <Grid container justify="space-between">
      <Grid item>
        <LayerButton
          navBarOperands={navBarOperands}
          mainViewOperands={mainViewOperands}
        />
        <ConcatButton
          navBarOperands={navBarOperands}
          mainViewOperands={mainViewOperands}
        />
        <RepeatButton
          navBarOperands={navBarOperands}
          mainViewOperands={mainViewOperands}
          tree={tree}
        />
        <FacetButton
          navBarOperands={navBarOperands}
          mainViewOperands={mainViewOperands}
          tree={tree}
        />
        <PlaceButton
          navBarOperands={navBarOperands}
          mainViewOperands={mainViewOperands}
        />
      </Grid>
      <Grid item>
        <Button onClick={handleUndo} disabled={undoDisabled}>
          <Undo /> &nbsp; Undo
        </Button>
        <Button onClick={handleRedo} disabled={redoDisabled}>
          <Redo /> &nbsp; Redo
        </Button>
        &nbsp; &nbsp; &nbsp;
        <ExportButton tree={tree} />
      </Grid>
    </Grid>
  );
};
