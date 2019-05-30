import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Grid from '@material-ui/core/Grid';

import { AppDispatch } from '../contexts';
import { ViewHolder } from '../SyntaxTree/View';

interface IOperationBarProps {
  specs: IBaseSpec[];
  operand1Id: number | null;
  operand2Id: number | null;
  tree: ViewHolder | null;
}

export const OperationBar: React.FC<IOperationBarProps> = ({
  specs,
  operand1Id,
  operand2Id,
  tree,
}) => {
  const dispatch = useContext(AppDispatch);

  const handleUndo = () => dispatch({ type: 'undo' });
  const handleRedo = () => dispatch({ type: 'redo' });
  const operate = (operator: Operator) => {
    specs.forEach(spec => {
      if (spec.id === operand1Id) {
        dispatch({
          type: 'operate',
          operand1: spec.spec,
          operand2Id,
          operator,
        });
      }
    });
  };

  const layerDisabled = operand1Id === null || operand2Id === null;
  const concatDisabled = operand1Id === null || operand2Id === null;
  const repeatDisabled = operand1Id !== null || operand2Id === null;
  const facetDisabled = operand1Id !== null || operand2Id === null;
  const placeDisabled =
    operand1Id === null || operand2Id !== null || tree !== null;

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
