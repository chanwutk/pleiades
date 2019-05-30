import React, { useContext } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { borderWidth } from '../../variables';
import { AppDispatch } from '../../contexts';

export const useStyles = makeStyles(_ => ({
  main: {
    padding: 10,
    border: borderWidth,
    borderColor: ((active: boolean) =>
      active ? '#3caea3' : 'lightgrey') as any,
    borderStyle: 'solid',
    '&:hover': {
      borderColor: ((active: boolean) =>
        active ? '#3caea3' : 'darkgrey') as any,
    },
    '&:active': {
      borderColor: 'grey',
    },
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export interface IViewComponentProps {
  view: View;
  operands: number[];
}

export const makeViewComponent = (
  View: React.FC<IViewComponentProps>
): React.FC<IViewComponentProps> => ({ view, operands }) => {
  const dispatch = useContext(AppDispatch);
  const thisId = view.getId();
  const handleToggleActive = () => {
    dispatch({
      type: 'select-operand',
      operand: thisId,
    });
  };
  const classes = useStyles(operands.includes(thisId));
  return (
    <div className={classes.main} onClick={handleToggleActive}>
      <View view={view} operands={operands} />
    </div>
  );
};
