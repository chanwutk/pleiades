import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { FacetInfo } from '../../SyntaxTree/FacetView';
import { operateFactory } from './Utils';

export const FacetButton: React.FC = () => {
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const operate = operateFactory(useDispatch(), operands);

  const navBarOperands = operands.filter(x => x < 0);
  const mainViewOperands = operands.filter(x => x > 0);

  const facetDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length > 0;

  return (
    <Button
      // Replace this fake facet as interation to select orientation and fields
      onClick={() =>
        operate(
          'facet',
          new FacetInfo({
            column: { field: 'Cylinders', type: 'ordinal' },
            row: { field: 'Origin', type: 'nominal' },
          })
        )
      }
      disabled={facetDisabled}
    >
      Facet
    </Button>
  );
};
