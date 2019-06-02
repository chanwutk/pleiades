import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { IOperationProps, useWarningStyles } from '../OperationBar';
import { PopupRepeatOption } from './PopupRepeatOption';
import { containsDifferentData } from '../../SyntaxTree/Utils';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';

export const RepeatButton: React.FC<IOperationProps> = ({
  navBarOperands,
  mainViewOperands,
  tree,
}) => {
  const classes = useWarningStyles();
  const [isOpen, setIsOpen] = useState(false);
  const repeatDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length > 0;

  const repeatWarn = () => {
    return (
      !repeatDisabled &&
      containsDifferentData(tree!
        .findView(mainViewOperands[0])!
        .view.export() as IRawSpec)
    );
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        disabled={repeatDisabled}
        className={repeatWarn() ? classes.buttonWarn : classes.buttonNormal}
      >
        {repeatWarn() ? (
          <>
            <ErrorOutlineOutlined className={classes.error} /> &nbsp;
          </>
        ) : (
          <></>
        )}
        Repeat
      </Button>
      <PopupRepeatOption isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
