import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface IMainViewProps {
  viz: React.FC | null;
}

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

export const MainView: React.FC<IMainViewProps> = ({ viz }) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {viz ?
        viz :
        <div>
          Empty View
        </div>
      }
    </div>
  );
};
