import { ViewHolder } from '../../SyntaxTree/View';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { borderWidth } from '../../variables';

export const useStyles = makeStyles(theme => ({
  main: {
    padding: 10,
    border: borderWidth,
    borderColor: ((active: boolean) =>
      active ? '#3caea3' : 'lightgrey') as any,
    borderStyle: 'solid',
    '&:hover': {
      borderColor: ((active: boolean) =>
        active ? '#3caea3' : 'darkgrey') as any,
    },
    '&:active': {
      borderColor: ((active: boolean) => 'grey') as any,
    },
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export interface IViewComponentProps {
  view: ViewHolder;
  operand2Id: number | null;
}
