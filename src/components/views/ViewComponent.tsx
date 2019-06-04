import React, { useState } from 'react';
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
  setIsHovering?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const makeViewComponent = (
  View: React.FC<IViewComponentProps>
): React.FC<IViewComponentProps> => ({ view, setIsHovering }) => {
  const thisId = view.id;
  const dispatch = useDispatch();
  const [isHoveringChild, setIsHoveringChild] = useState(false);
  const isOperandIncluded = useSelector((state: IGlobalState) =>
    state.current.operands.includes(thisId)
  );
  const handleToggleActive = () => {
    if (!isHoveringChild) {
      dispatch({
        type: 'select-operand',
        operand: thisId,
      });
    }
  };
  const classes = useStyles(isOperandIncluded);
  return (
    <div
      className={classes.main}
      onClick={handleToggleActive}
      onMouseEnter={() => setIsHovering && setIsHovering(true)}
      onMouseLeave={() => setIsHovering && setIsHovering(false)}
    >
      <View view={view} setIsHovering={setIsHoveringChild} />
    </div>
  );
};
