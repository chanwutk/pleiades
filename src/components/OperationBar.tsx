import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Grid from '@material-ui/core/Grid';

import { AppDispatch } from '../contexts';
import { ViewHolder } from '../SyntaxTree/View';

interface IModeBarProps {
  specs: IBaseSpec[];
  operand1Id: number | null;
  operand2: any;
  result: ViewHolder | null;
}

export const OperationBar: React.FC<IModeBarProps> = ({ specs, operand1Id, operand2, result }) => {
  const dispatch = useContext(AppDispatch);

  const handleUndo = () => dispatch({ type: 'undo' });
  const handleRedo = () => dispatch({ type: 'redo' });
  const operate = (operator: Operator) => {
    specs.forEach(spec => {
      if (spec.id === operand1Id) {
        dispatch({ type: 'operate', operand1: spec.spec, operand2, operator });
        return;
      }
    });
  };

  const layerDisabled = operand1Id === null || operand2 === null;
  const concatDisabled = operand1Id === null || operand2 === null;
  const repeatDisabled = operand1Id !== null || operand2 === null;
  const facetDisabled = operand1Id !== null || operand2 === null;
  const placeDisabled = operand1Id === null || operand2 !== null || result !== null;

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