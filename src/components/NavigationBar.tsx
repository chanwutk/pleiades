import React, { useState } from 'react';
import { SpecPreview } from './SpecPreview';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

export interface INavigationBarProps {
  specs: RawSpec[];
  onModify: (id: number) => (alias: string, json: any) => void;
  onDelete: (id: number) => () => void;
}

const useStyles = makeStyles(theme => ({
  list: {
    overflowY: 'auto',
    overflowX: 'hidden',
    flexGrow: 1,
    paddingTop: 0,
    paddingBottom: 0
  }
}));

export const NavigationBar: React.FC<INavigationBarProps> = ({
  specs,
  onModify,
  onDelete
}) => {
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
          onModify={onModify(spec.id)}
          onDelete={onDelete(spec.id)}
        />
      ))}
    </List>
  );
};
