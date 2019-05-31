import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import { isUnitSpec } from 'vega-lite/build/src/spec';
import { LayerView } from '../../SyntaxTree/LayerView';
import { makeStyles } from '@material-ui/core/styles';
import { UnitView } from '../../SyntaxTree/View';
import { operateFactory } from './Utils';
import { IOperationProps } from '../OperationBar';

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

export const LayerButton: React.FC<IOperationProps> = ({
  navBarOperands,
  mainViewOperands,
}) => {
  const classes = useStyles();
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const tree = useSelector((state: IGlobalState) => state.current.tree);
  const specs = useSelector((state: IGlobalState) => state.current.specs);
  const operate = operateFactory(useDispatch(), operands);

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

  return (
    <Button
      onClick={() => operate('layer')}
      disabled={layerDisabled}
      className={layerWarn ? classes.buttonWarn : classes.buttonNormal}
    >
      {layerWarn ? (
        <>
          <ErrorOutlineOutlined className={classes.error} /> &nbsp;
        </>
      ) : (
        <></>
      )}
      Layer
    </Button>
  );
};

function layerDisabledCheck(
  mainViewOperands: number[],
  navBarOperands: number[],
  specs: IBaseSpec[],
  tree: View | null
): boolean {
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
}

function layerWarnCheck(
  layerDisabled: boolean,
  specs: IBaseSpec[],
  navBarOperands: number[],
  mainViewOperands: number[],
  tree: View | null
): boolean {
  if (layerDisabled) {
    return false;
  }

  const encodings: any[] = [];
  for (const spec of specs) {
    if (navBarOperands.includes(spec.id)) {
      encodings.push(new UnitView(spec.spec).getEncoding());
    }
  }

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
}
