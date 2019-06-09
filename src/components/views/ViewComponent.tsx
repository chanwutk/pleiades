import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import makeStyles from '@material-ui/core/styles/makeStyles';

import {
  borderWidth,
  activeBorderColor,
  borderColor,
  hoverBorderColor,
  mouseDownBorderColor,
} from '../../variables';

interface ActiveStatus {
  isActive: boolean;
  toHover: boolean;
}

export const useStyles = makeStyles(_ => ({
  main: {
    padding: 10,
    border: borderWidth,
    borderColor: ((status: ActiveStatus) =>
      status.isActive ? activeBorderColor : borderColor) as any,
    borderStyle: 'solid',
    '&:hover': {
      borderColor: ((status: ActiveStatus) =>
        status.isActive
          ? activeBorderColor
          : status.toHover
          ? borderColor
          : hoverBorderColor) as any,
    },
    '&:active': {
      borderColor: mouseDownBorderColor,
    },
    cursor: 'pointer',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
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
  const classes = useStyles({
    isActive: isOperandIncluded,
    toHover: isHoveringChild,
  });
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
