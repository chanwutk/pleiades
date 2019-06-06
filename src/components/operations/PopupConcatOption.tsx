import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  DialogContent,
  DialogContentText,
  Switch,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
// import makeStyles from '@material-ui/styles/makeStyles';
import { ConcatView } from '../../SyntaxTree/ConcatView';
import { VegaLite } from '../VegaLite';

export interface IPopupConcatOptionProps {
  isOpen: boolean;
  onClose: () => void;
  tree: View | null;
}

// const useStyles = makeStyles(() => ({}));

export const PopupConcatOption: React.FC<IPopupConcatOptionProps> = ({
  isOpen,
  onClose,
  tree,
}) => {
  // const classes = useStyles();
  const [subViewsOrder, setSubViewsOrder] = useState<number[]>([]);
  const [currentOrient, setCurrentOrient] = useState<ConcatOrient>('h');
  const [subViewMap, setSubViewMap] = useState({});
  const [selectedSubView, setSelectedSubView] = useState<number | null>(null);

  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const dispatch = useDispatch();

  const handleEntering = () => {
    const { view } = tree!.findView(operands[0])!;
    const subViews = (view as ConcatView).getSubViews();
    const map = {};
    subViews.forEach(subView => {
      map[subView.id] = subView;
    });
    setSubViewMap(map);
    setSubViewsOrder(subViews.map(subViews => subViews.id));
    setCurrentOrient((view as ConcatView).getOrient());
  };

  const handleOrientChange = event => {
    setCurrentOrient(event.target.checked ? 'h' : 'v');
  };

  const operateDisabled = selectedSubView !== null;

  return (
    <Dialog
      open={isOpen}
      onEntering={handleEntering}
      aria-labelledby="facet-dialog-title"
    >
      <DialogTitle id="facet-dialog-title">
        <>Concat</>
        <IconButton
          onClick={onClose}
          style={{ right: 10, top: 7, position: 'absolute' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Rearrange and remove sub views. Or change concat orientation.
        </DialogContentText>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: currentOrient === 'h' ? 'row' : 'column',
            alignItems: 'center',
          }}
        >
          {subViewsOrder.map(subView => (
            <VegaLite spec={subViewMap[subView].export()} />
          ))}
        </div>
      </DialogContent>
      <DialogActions
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingLeft: 20,
        }}
      >
        <div>
          {'v'}
          <Switch
            checked={currentOrient === 'h'}
            onChange={handleOrientChange}
            color="default"
            inputProps={{ 'aria-label': 'checkbox with default color' }}
          />
          {'h'}
        </div>
        <div>
          <Button
            onClick={() => {
              setSubViewsOrder(
                subViewsOrder.filter(subView => subView !== selectedSubView)
              );
              setSelectedSubView(null);
            }}
            color="secondary"
            disabled={selectedSubView === null}
          >
            Remove
          </Button>
          <Button
            onClick={() => {
              dispatch({
                type: 'rearrange-subview',
                operand: operands[0],
                order: subViewsOrder,
                orient: currentOrient,
              });
              onClose();
            }}
            autoFocus
            disabled={operateDisabled}
          >
            Concat
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};
