import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { operateFactory } from './Utils';

export const PlaceButton: React.FC = () => {
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const tree = useSelector((state: IGlobalState) => state.current.tree);

  const operate = operateFactory(useDispatch(), operands);

  const navBarOperands = operands.filter(x => x < 0);
  const mainViewOperands = operands.filter(x => x > 0);

  const placeDisabled =
    tree !== null || mainViewOperands.length > 0 || navBarOperands.length !== 1;

  return (
    <Button onClick={() => operate('place')} disabled={placeDisabled}>
      Place
    </Button>
  );
};
