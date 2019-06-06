import React, { SetStateAction } from 'react';
import { VegaLite } from '../VegaLite';
import { makeStyles } from '@material-ui/core/styles';
import { borderWidth } from '../../variables';

export interface IViewPreviewProps {
  view: View;
  selectedSubViewId: number | null;
  setSelectedSubViewId: React.Dispatch<SetStateAction<number | null>>;
}
const useStyles = makeStyles(() => ({
  preview: {
    border: borderWidth,
    borderColor: ((active: boolean) =>
      active ? '#3caea3' : 'lightgrey') as any,
    borderStyle: 'solid',
    '&:hover': {
      borderColor: ((active: boolean) =>
        active ? '#3caea3' : 'darkgrey') as any,
    },
    '&:active': {
      borderColor: 'grey',
    },
  },
}));

export const ViewPreview: React.FC<IViewPreviewProps> = ({
  view,
  selectedSubViewId,
  setSelectedSubViewId,
}) => {
  const classes = useStyles(selectedSubViewId === view.id);

  const onToggleActive = () => {
    setSelectedSubViewId(selectedSubViewId !== view.id ? view.id : null);
  };

  return (
    <div className={classes.preview} onClick={onToggleActive}>
      <VegaLite spec={view.export()} />
    </div>
  );
};
