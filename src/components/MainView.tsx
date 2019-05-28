import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: theme.palette.grey[200],
    marginTop: theme.spacing(1),
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

export const MainView: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.main} />
  );
};
