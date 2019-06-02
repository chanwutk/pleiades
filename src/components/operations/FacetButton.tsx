import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { PopupFacetOption } from './PopupFacetOption';
import { IOperationProps, useWarningStyles } from '../OperationBar';
import { containsDifferentData } from '../../SyntaxTree/Utils';
import ErrorOutlineOutlined from '@material-ui/icons/ErrorOutlineOutlined';

export const FacetButton: React.FC<IOperationProps> = ({
  navBarOperands,
  mainViewOperands,
  tree,
}) => {
  const classes = useWarningStyles();
  const [isOpen, setIsOpen] = useState(false);
  const facetDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length > 0;

  const facetWarn = () => {
    return (
      !facetDisabled &&
      containsDifferentData(tree!
        .findView(mainViewOperands[0])!
        .view.export() as IRawSpec)
    );
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        disabled={facetDisabled}
        className={facetWarn() ? classes.buttonWarn : classes.buttonNormal}
      >
        {facetWarn() ? (
          <>
            <ErrorOutlineOutlined className={classes.error} /> &nbsp;
          </>
        ) : (
          <></>
        )}
        Facet
      </Button>
      <PopupFacetOption isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
