import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { IOperationProps } from '../OperationBar';
import { PopupRepeatOption } from './PopupRepeatOption';

export const RepeatButton: React.FC<IOperationProps> = ({
  navBarOperands,
  mainViewOperands,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const repeatDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length > 0;

  return (
    <>
      <Button onClick={() => setIsOpen(true)} disabled={repeatDisabled}>
        Repeat
      </Button>
      <PopupRepeatOption isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
