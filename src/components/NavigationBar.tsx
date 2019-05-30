import React from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

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
    paddingBottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
  },
}));

export const NavigationBar: React.FC<INavigationBarProps> = ({
  currentState,
}) => {
  const classes = useStyles();

  return (
    <List className={classes.list}>
      {currentState.specs.map(spec => (
        <SpecPreview
          key={spec.id}
          spec={spec}
          active={currentState.operands.includes(spec.id)}
        />
      ))}
    </List>
  );
};
