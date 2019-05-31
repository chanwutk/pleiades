import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { PopupFacetOption } from './PopupFacetOption';

export const FacetButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const operands = useSelector((state: IGlobalState) => state.current.operands);

  const navBarOperands = operands.filter(x => x < 0);
  const mainViewOperands = operands.filter(x => x > 0);

  const facetDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length > 0;

  return (
    <Button onClick={() => setIsOpen(true)} disabled={facetDisabled}>
      Facet
      <PopupFacetOption isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </Button>
  );
};
