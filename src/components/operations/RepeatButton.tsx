import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { IOperationProps, useWarningStyles } from '../OperationBar';
import { PopupRepeatOption } from './PopupRepeatOption';
import { containsDifferentData } from '../../SyntaxTree/Utils';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';
import { TooltipTable } from '../TooltipTable';

export const RepeatButton: React.FC<IOperationProps> = ({
  navBarOperands,
  mainViewOperands,
  tree,
}) => {
  const classes = useWarningStyles();
  const [isOpen, setIsOpen] = useState(false);
  const repeatDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length > 0;

  const repeatWarn =
    !repeatDisabled &&
    containsDifferentData(tree!
      .findView(mainViewOperands[0])!
      .view.export() as IRawSpec);

  return (
    <>
      {repeatWarn ? (
        <TooltipTable
          table={[['Warning', 'Not all views are using the same data source']]}
        >
          <Button
            onClick={() => setIsOpen(true)}
            className={classes.buttonWarn}
          >
            <ErrorOutlineOutlined className={classes.error} /> &nbsp; Repeat
          </Button>
        </TooltipTable>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          disabled={repeatDisabled}
          className={classes.buttonNormal}
        >
          Repeat
        </Button>
      )}
      <PopupRepeatOption isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
