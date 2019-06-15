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
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { ConcatView } from '../../SyntaxTree/ConcatView';
import { ViewPreview } from './ViewPreview';
import makeStyles from '@material-ui/styles/makeStyles';

export interface IPopupConcatOptionProps {
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  views: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: (direction => (direction ? 'row' : 'column')) as any,
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
  },
}));

export const PopupConcatOption: React.FC<IPopupConcatOptionProps> = ({
  isOpen,
  onClose,
}) => {
  const [subViewIdsOrder, setSubViewIdsOrder] = useState<number[]>([]);
  const [currentOrient, setCurrentOrient] = useState<ConcatOrient>('h');
  const [subViewsMap, setSubViewsMap] = useState({});
  const [selectedSubViewId, setSelectedSubViewId] = useState<number | null>(
    null
  );
  const classes = useStyles(currentOrient === 'h');

  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const tree = useSelector((state: IGlobalState) => state.current.tree);
  const dispatch = useDispatch();

  const handleEntering = () => {
    const { view } = tree!.findView(operands[0])!;
    const subViews = (view as ConcatView).getSubViews();
    const _subViewMap = {};
    subViews.forEach(subView => {
      _subViewMap[subView.id] = subView;
    });
    setSubViewsMap(_subViewMap);
    setSubViewIdsOrder(subViews.map(subViews => subViews.id));
    setCurrentOrient((view as ConcatView).getOrient());
    setSelectedSubViewId(null);
  };

  const handleOrientChange = event => {
    setCurrentOrient(event.target.checked ? 'h' : 'v');
  };

  const handleMoveFront = () => {
    for (let i = 1; i < subViewIdsOrder.length; i++) {
      if (subViewIdsOrder[i] === selectedSubViewId) {
        const newOrder = [...subViewIdsOrder];
        newOrder[i - 1] = subViewIdsOrder[i];
        newOrder[i] = subViewIdsOrder[i - 1];
        setSubViewIdsOrder(newOrder);
        return;
      }
    }
  };

  const handleMoveBack = () => {
    for (let i = 0; i < subViewIdsOrder.length - 1; i++) {
      if (subViewIdsOrder[i] === selectedSubViewId) {
        const newOrder = [...subViewIdsOrder];
        newOrder[i + 1] = subViewIdsOrder[i];
        newOrder[i] = subViewIdsOrder[i + 1];
        setSubViewIdsOrder(newOrder);
        return;
      }
    }
  };

  const handleRemove = () => {
    setSubViewIdsOrder(
      subViewIdsOrder.filter(subView => subView !== selectedSubViewId)
    );
    setSelectedSubViewId(null);
  };

  const handleConcat = () => {
    dispatch({
      type: 'rearrange-subview',
      operand: operands[0],
      order: subViewIdsOrder,
      orient: currentOrient,
    });
    onClose();
  };

  const operateDisabled = subViewIdsOrder.length === 0;

  return (
    <Dialog
      open={isOpen}
      onEntering={handleEntering}
      aria-labelledby="concat-dialog-title"
    >
      <DialogTitle id="concat-dialog-title">
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
          Rearrange or remove sub views. Or change concat orientation.
        </DialogContentText>
        <div className={classes.views}>
          {subViewIdsOrder.map(subView => (
            <ViewPreview
              view={subViewsMap[subView] as View}
              selectedSubViewId={selectedSubViewId}
              setSelectedSubViewId={setSelectedSubViewId}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions className={classes.actions}>
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
          <IconButton
            disabled={
              selectedSubViewId === null ||
              selectedSubViewId === subViewIdsOrder[0]
            }
            onClick={handleMoveFront}
          >
            {currentOrient === 'h' ? <ArrowBack /> : <ArrowUpward />}
          </IconButton>
          <IconButton
            disabled={
              selectedSubViewId === null ||
              selectedSubViewId === subViewIdsOrder[subViewIdsOrder.length - 1]
            }
            onClick={handleMoveBack}
          >
            {currentOrient === 'h' ? <ArrowForward /> : <ArrowDownward />}
          </IconButton>
        </div>
        <div>
          <Button
            onClick={handleRemove}
            color="secondary"
            disabled={selectedSubViewId === null || subViewIdsOrder.length <= 1}
          >
            Remove
          </Button>
          <Button onClick={handleConcat} autoFocus disabled={operateDisabled}>
            Concat
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};
