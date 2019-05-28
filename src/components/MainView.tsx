import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { VegaLite } from './VegaLite';

export interface IMainViewProps {
  view: any;
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

export const MainView: React.FC<IMainViewProps> = ({ view }) => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      {
        view ?
          <VegaLite
            spec={view.export()} // todo: display each component of the spec
          /> :
          "Empty View"
      }
    </div>
  );
};
