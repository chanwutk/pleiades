import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import { borderWidth } from '../../variables';

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
}

export const makeViewComponent = (
  View: React.FC<IViewComponentProps>
): React.FC<IViewComponentProps> => ({ view }) => {
  const thisId = view.id;
  const dispatch = useDispatch();
  const isOperandIncluded = useSelector((state: IGlobalState) =>
    state.current.operands.includes(thisId)
  );
  const handleToggleActive = () => {
    dispatch({
      type: 'select-operand',
      operand: thisId,
    });
  };
  const classes = useStyles(isOperandIncluded);
  return (
    <div className={classes.main} onClick={handleToggleActive}>
      <View view={view} />
    </div>
  );
};
