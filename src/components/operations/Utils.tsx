import { FacetInfo } from '../../SyntaxTree/FacetView';
import { RepeatInfo } from '../../SyntaxTree/RepeatView';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';

export const operateFactory = (
  dispatch: Dispatch<AnyAction>,
  operands: number[]
) => {
  return (operator: Operator, extraOperand?: RepeatInfo | FacetInfo) => {
    // make sure that disabled functions properly, and we won't need to
    // write a check here
    dispatch({
      type: 'operate',
      operands,
      operator,
      ...(extraOperand ? { extraOperand } : {}),
    });
  };
};
