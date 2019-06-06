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
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import { ViewPreview } from '../operations/ViewPreview';
import { LayerView } from '../../SyntaxTree/LayerView';
import makeStyles from '@material-ui/styles/makeStyles';

export interface IPopupLayerOptionProps {
  isOpen: boolean;
  onClose: () => void;
  tree: View | null;
}

const useStyles = makeStyles(() => ({
  views: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: 20,
  },
}));

export const PopupLayerOption: React.FC<IPopupLayerOptionProps> = ({
  isOpen,
  onClose,
  tree,
}) => {
  const classes = useStyles();
  const [subViewIdsOrder, setSubViewIdsOrder] = useState<number[]>([]);
  const [subViewsMap, setSubViewsMap] = useState({});
  const [selectedSubViewId, setSelectedSubViewId] = useState<number | null>(
    null
  );

  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const dispatch = useDispatch();

  const handleEntering = () => {
    const { view } = tree!.findView(operands[0])!;
    const subViews = (view as LayerView).getSubViews();
    const _subViewMap = {};
    subViews.forEach(subView => {
      _subViewMap[subView.id] = subView;
    });
    setSubViewsMap(_subViewMap);
    setSubViewIdsOrder(subViews.map(subViews => subViews.id));
    setSelectedSubViewId(null);
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

  const handleLayer = () => {
    dispatch({
      type: 'rearrange-subview',
      operand: operands[0],
      order: subViewIdsOrder,
    });
    onClose();
  };

  const operateDisabled = subViewIdsOrder.length === 0;

  return (
    <Dialog
      open={isOpen}
      onEntering={handleEntering}
      aria-labelledby="layer-dialog-title"
    >
      <DialogTitle id="layer-dialog-title">
        <>Layer</>
        <IconButton
          onClick={onClose}
          style={{ right: 10, top: 7, position: 'absolute' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Rearrange or remove sub views.</DialogContentText>
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
          <IconButton
            disabled={
              selectedSubViewId === null ||
              selectedSubViewId === subViewIdsOrder[0]
            }
            onClick={handleMoveFront}
          >
            <ArrowUpward />
          </IconButton>
          <IconButton
            disabled={
              selectedSubViewId === null ||
              selectedSubViewId === subViewIdsOrder[subViewIdsOrder.length - 1]
            }
            onClick={handleMoveBack}
          >
            <ArrowDownward />
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
          <Button onClick={handleLayer} autoFocus disabled={operateDisabled}>
            Layer
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
};
