import React, { useContext } from 'react';
import { IViewComponentProps, useStyles } from './ViewComponent';
import { VegaLite } from '../VegaLite';
import { AppDispatch } from '../../contexts';

export const UnitComponent: React.FC<IViewComponentProps> = ({ view, operand2 }) => {

  const dispatch = useContext(AppDispatch);

  const handleToggleActive = () => {
    dispatch({ type: 'select-operand2', operand: view === operand2 ? null : view });
  };

  const classes = useStyles(view === operand2);

  return <div className={classes.main} onClick={handleToggleActive}>
    <VegaLite
      spec={view.export()}
    />
  </div>;
};
