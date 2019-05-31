import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { operateFactory } from './Utils';
import { IOperationProps } from '../OperationBar';

export const ConcatButton: React.FC<IOperationProps> = ({
  navBarOperands,
  mainViewOperands,
}) => {
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const operate = operateFactory(useDispatch(), operands);

  const concatDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length !== 1;

  return (
    <Button onClick={() => operate('concat')} disabled={concatDisabled}>
      Concat
    </Button>
  );
};
