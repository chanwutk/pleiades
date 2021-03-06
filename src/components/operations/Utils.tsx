import { Dispatch } from 'react';
import { AnyAction } from 'redux';

export const operateFactory = (
  dispatch: Dispatch<AnyAction>,
  operands: number[]
) => {
  return (operator: Operator, extra?: ExtraOperator) => {
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
