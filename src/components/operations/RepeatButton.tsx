import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { RepeatInfo } from '../../SyntaxTree/RepeatView';
import { operateFactory } from './Utils';
import { IOperationProps } from '../OperationBar';

export const RepeatButton: React.FC<IOperationProps> = ({
  navBarOperands,
  mainViewOperands,
}) => {
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const operate = operateFactory(useDispatch(), operands);

  const repeatDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length > 0;

  return (
    <Button
      // Replace this fake repeat as interation to select channels and fields
      onClick={() =>
        operate(
          'repeat',
          new RepeatInfo(
            ['Horsepower', 'Miles_per_Gallon'],
            ['Displacement', 'Horsepower', 'Miles_per_Gallon'],
            { rowChannel: 'x', columnChannel: 'y' }
          )
        )
      }
      disabled={repeatDisabled}
    >
      Repeat
    </Button>
  );
};
