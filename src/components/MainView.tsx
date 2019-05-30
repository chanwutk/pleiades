import React from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { render } from './views/Renderer';

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: theme.palette.grey[200],
    marginTop: theme.spacing(1),
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyView: {
    color: 'darkgrey',
    fontSize: 20,
  },
}));

export const MainView: React.FC = () => {
  const classes = useStyles();
  const tree = useSelector((state: IGlobalState) => state.current.tree);
  return (
    <div className={classes.main}>
      {tree ? (
        render(tree)
      ) : (
        <div className={classes.emptyView}>Empty View</div>
      )}
    </div>
  );
};
