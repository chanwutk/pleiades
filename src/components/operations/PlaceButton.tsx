import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { operateFactory } from './Utils';
import { IOperationProps } from '../OperationBar';

export const PlaceButton: React.FC<IOperationProps> = ({
  navBarOperands,
  mainViewOperands,
}) => {
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const tree = useSelector((state: IGlobalState) => state.current.tree);

  const operate = operateFactory(useDispatch(), operands);

  const placeDisabled =
    (mainViewOperands.length === 0 ? tree !== null : false) ||
    navBarOperands.length !== 1;

  const toReplace = tree !== null;

  return (
    <Button
      onClick={() => operate(toReplace ? 'replace' : 'place')}
      disabled={placeDisabled}
    >
      {toReplace ? 'Replace' : 'Place'}
    </Button>
  );
};
