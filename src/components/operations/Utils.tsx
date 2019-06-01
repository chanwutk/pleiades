import { FacetInfo } from '../../SyntaxTree/FacetView';
import { RepeatInfo } from '../../SyntaxTree/RepeatView';
import { Dispatch } from 'react';
import { AnyAction } from 'redux';

export const operateFactory = (
  dispatch: Dispatch<AnyAction>,
  operands: number[]
) => {
  return (operator: Operator, extra?: RepeatInfo | FacetInfo | string) => {
    // make sure that disabled functions properly, and we won't need to
    // write a check here
    dispatch({
      type: 'operate',
      operands,
      operator,
      ...(extra ? { extra } : {}),
    });
  };
};
