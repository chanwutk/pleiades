import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import Grid from '@material-ui/core/Grid';
import { isUnitSpec } from 'vega-lite/build/src/spec';
import { LayerView } from '../SyntaxTree/LayerView';
import { makeStyles } from '@material-ui/core/styles';
import { UnitView } from '../SyntaxTree/View';

const useStyles = makeStyles(() => ({
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

const errorWrapperStyle = {
  height: 22,
};

const layerDisabledCheck = (
  mainViewOperands: number[],
  navBarOperands: number[],
  specs: IBaseSpec[],
  tree: View | null
) => {
  if (
    mainViewOperands.length !== 1 ||
    navBarOperands.length !== 1 ||
    specs.filter(
      spec => navBarOperands.includes(spec.id) && !isUnitSpec(spec.spec)
    ).length !== 0
  ) {
    return true;
  }

  const mainViewOperand = tree!.findView(mainViewOperands[0]);
  return (
    mainViewOperand === null ||
    (!(mainViewOperand.view instanceof LayerView) &&
      !isUnitSpec(mainViewOperand.view.export()))
  );
};

const layerWarnCheck = (
  layerDisabled: boolean,
  specs: IBaseSpec[],
  navBarOperands: number[],
  mainViewOperands: number[],
  tree: View | null
) => {
  if (layerDisabled) {
    return false;
  }

  const encodings = specs
    .filter(spec => navBarOperands.includes(spec.id))
    .map(spec => new UnitView(spec.spec).getEncoding());
  const mainViewOperand = tree!.findView(mainViewOperands[0])!.view;
  let mainViewEncodings: any[] = [];
  if (mainViewOperand instanceof UnitView) {
    mainViewEncodings = [mainViewOperand.getEncoding()];
  } else if (mainViewOperand instanceof LayerView) {
    mainViewEncodings = mainViewOperand.getEncoding();
  }

  const currentEncodingField = {};
  for (const encoding of encodings.concat(mainViewEncodings)) {
    for (const key of Object.keys(encoding)) {
      if (
        key in currentEncodingField &&
        currentEncodingField[key] !== encoding[key].field
      ) {
        return true;
      }
      currentEncodingField[key] = encoding[key].field;
    }
  }
  return false;
};

export const OperationBar: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const tree = useSelector((state: IGlobalState) => state.current.tree);
  const specs = useSelector((state: IGlobalState) => state.current.specs);
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

  const layerDisabled = layerDisabledCheck(
    mainViewOperands,
    navBarOperands,
    specs,
    tree
  );
  const layerWarn = layerWarnCheck(
    layerDisabled,
    specs,
    navBarOperands,
    mainViewOperands,
    tree
  );

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
        <Button
          onClick={() => operate('layer')}
          disabled={layerDisabled}
          className={layerWarn ? classes.buttonWarn : classes.buttonNormal}
        >
          {layerWarn ? (
            <div style={errorWrapperStyle}>
              <ErrorOutlineOutlined className={classes.error} /> &nbsp;
            </div>
          ) : (
            <div />
          )}
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
