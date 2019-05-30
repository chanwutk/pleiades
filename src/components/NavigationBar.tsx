import React from 'react';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';

import { SpecPreview } from './SpecPreview';

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

export const NavigationBar: React.FC = () => {
  const classes = useStyles();
  const specs = useSelector((state: IGlobalState) => state.current.specs);

  return (
    <List className={classes.list}>
      {specs.map(spec => (
        <SpecPreview key={spec.id} spec={spec} />
      ))}
    </List>
  );
};
