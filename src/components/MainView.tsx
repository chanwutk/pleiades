import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ViewHolder } from '../SyntaxTree/View';
import { UnitComponent } from './views/UnitComponent';
import { LayerComponent } from './views/LayerComponent';

export interface IMainViewProps {
  tree: ViewHolder;
  operand2Id: number | null;
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

export const MainView: React.FC<IMainViewProps> = ({ tree, operand2Id }) => {
  const classes = useStyles();

  const makeViewComponent = (viewHolder: ViewHolder) => {
    switch (viewHolder.view.getType()) {
      case 'unit': {
        return <UnitComponent view={viewHolder} operand2Id={operand2Id} />;
      }
      case 'layer': {
        return <LayerComponent view={viewHolder} operand2Id={operand2Id} />;
      }
      default:
        throw new Error(
          `${viewHolder.view.getType()} view has not been implemented`
        );
    }
  };

  return (
    <div className={classes.main}>
      {tree ? makeViewComponent(tree) : 'Empty View'}
    </div>
  );
};
