import React, { useContext } from 'react';
import { IViewComponentProps, useStyles } from './ViewComponent';
import { VegaLite } from '../VegaLite';
import { AppDispatch } from '../../contexts';

export const UnitComponent: React.FC<IViewComponentProps> = ({
  view,
  operand2Id,
}) => {
  const dispatch = useContext(AppDispatch);
  const thisId = view.view.getId();

  const handleToggleActive = () => {
    const thisId = view.view.getId();
    dispatch({
      type: 'select-operand2-id',
      operandId: thisId === operand2Id ? null : thisId,
    });
  };

  const classes = useStyles(thisId === operand2Id);

  return (
    <div className={classes.main} onClick={handleToggleActive}>
      <VegaLite spec={view.export()} />
    </div>
  );
};
