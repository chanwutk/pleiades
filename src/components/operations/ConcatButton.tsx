import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { operateFactory } from './Utils';

export const ConcatButton: React.FC = () => {
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const operate = operateFactory(useDispatch(), operands);

  const navBarOperands = operands.filter(x => x < 0);
  const mainViewOperands = operands.filter(x => x > 0);

  const concatDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length !== 1;

  return (
    <Button onClick={() => operate('concat')} disabled={concatDisabled}>
      Concat
    </Button>
  );
};
