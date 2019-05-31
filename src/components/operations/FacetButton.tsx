import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { PopupFacetOption } from './PopupFacetOption';
import { IOperationProps } from '../OperationBar';

export const FacetButton: React.FC<IOperationProps> = ({
  navBarOperands,
  mainViewOperands,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const facetDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length > 0;

  return (
    <>
      <Button onClick={() => setIsOpen(true)} disabled={facetDisabled}>
        Facet
      </Button>
      <PopupFacetOption isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
