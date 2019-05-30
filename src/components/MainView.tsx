import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { render } from './views/Renderer';

export interface IMainViewProps {
  tree: View | null;
  operands: number[];
}

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: theme.palette.grey[200],
    marginTop: theme.spacing(1),
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export const MainView: React.FC<IMainViewProps> = ({ tree, operands }) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {tree ? render(tree, operands) : 'Empty View'}
    </div>
  );
};
