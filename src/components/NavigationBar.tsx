import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { SpecPreview } from './SpecPreview';

export interface INavigationBarProps {
  currentState: IState;
}

const useStyles = makeStyles(_ => ({
  list: {
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 1,
    paddingTop: 0,
    paddingBottom: 0
  }
}));

export const NavigationBar: React.FC<INavigationBarProps> = ({ currentState }) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      <Divider />
      {currentState.specs.map(spec => (
        <SpecPreview
          key={spec.id}
          spec={spec}
          operand1Id={currentState.operand1Id}
          active={spec.id === currentState.operand1Id}
        />
      ))}
    </List>
  );
};
