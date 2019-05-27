import React, { useState } from 'react';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

import { SpecPreview } from './SpecPreview';

export interface INavigationBarProps {
  specs: IBaseSpec[];
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

export const NavigationBar: React.FC<INavigationBarProps> = ({ specs }) => {
  const [activePreview, setActivePreview] = useState<number | null>(null);

  const handleToggleActive = (id: number) => () =>
    setActivePreview(activePreview === id ? null : id);

  const classes = useStyles();

  return (
    <List className={classes.list}>
      <Divider />
      {specs.map(spec => (
        <SpecPreview
          key={spec.id}
          spec={spec}
          active={spec.id === activePreview}
          onToggleActive={handleToggleActive(spec.id)}
        />
      ))}
    </List>
  );
};
