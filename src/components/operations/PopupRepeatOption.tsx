import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { operateFactory } from './Utils';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  DialogContent,
  Checkbox,
  TextField,
  DialogContentText,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import makeStyles from '@material-ui/styles/makeStyles';
import { RepeatInfo } from '../../SyntaxTree/RepeatView';

export interface IPopupRepeatOptionProps {
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  channelSelector: {
    minWidth: 60,
  },
  checkBox: {
    top: 10,
  },
}));

function isStringArray(array: any): array is string[] {
  if (!Array.isArray(array)) {
    return false;
  }

  for (const elm of array) {
    if (typeof elm !== 'string') {
      return false;
    }
  }
  return true;
}

export const PopupRepeatOption: React.FC<IPopupRepeatOptionProps> = ({
  isOpen,
  onClose,
}) => {
  const classes = useStyles();
  const [checkRow, setCheckRow] = useState(false);
  const [checkColumn, setCheckColumn] = useState(false);
  const [rowFields, setRowFields] = useState<string[]>([]);
  const [displayRowFields, setDisplayRowFields] = useState('');
  const [rowChannel, setRowChannel] = useState('');
  const [columnFields, setColumnFields] = useState<string[]>([]);
  const [displayColumnFields, setDisplayColumnFields] = useState('');
  const [columnChannel, setColumnChannel] = useState('');

  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const operate = operateFactory(useDispatch(), operands);

  const handleEntering = () => {
    setCheckRow(false);
    setCheckColumn(false);
    setRowFields([]);
    setDisplayRowFields('');
    setRowChannel('');
    setColumnFields([]);
    setDisplayColumnFields('');
    setColumnChannel('');
  };

  const operateDisabled = () =>
    (!(checkRow && rowFields.length !== 0 && rowChannel !== '') &&
      !(checkColumn && columnFields.length !== 0 && columnChannel !== '')) ||
    ((checkRow && (rowFields.length === 0 || rowChannel === '')) ||
      (checkColumn && (columnFields.length === 0 || columnChannel === '')));

  const handleTextChangeFactory = (
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    displaySetter: React.Dispatch<React.SetStateAction<string>>
  ) => event => {
    displaySetter(event.target.value);
    try {
      const parsed = JSON.parse(event.target.value);
      setter(isStringArray(parsed) ? parsed : []);
    } catch (error) {
      setter([]);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onEntering={handleEntering}
      aria-labelledby="repeat-dialog-title"
    >
      <DialogTitle id="repeat-dialog-title">
        <>Repeat</>
        <IconButton
          onClick={onClose}
          style={{ right: 10, top: 7, position: 'absolute' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose Field(s) and Encoding Channel(s) to repeat.
        </DialogContentText>
        <div>
          <Checkbox
            checked={checkRow}
            onChange={() => setCheckRow(!checkRow)}
            className={classes.checkBox}
          />
          <TextField
            label="Row Fields"
            value={displayRowFields}
            onChange={handleTextChangeFactory(
              setRowFields,
              setDisplayRowFields
            )}
            placeholder={'Ex: ["field1", "field2", "field3"]'}
          />
          &nbsp; &nbsp;
          <TextField
            label="Channel"
            value={rowChannel}
            onChange={event => setRowChannel(event.target.value)}
            placeholder={'Ex: x'}
          />
        </div>
        <div>
          <Checkbox
            checked={checkColumn}
            onChange={() => setCheckColumn(!checkColumn)}
            className={classes.checkBox}
          />
          <TextField
            label="Column Fields"
            value={displayColumnFields}
            onChange={handleTextChangeFactory(
              setColumnFields,
              setDisplayColumnFields
            )}
            placeholder={'Ex: ["field1", "field2", "field3"]'}
          />
          &nbsp; &nbsp;
          <TextField
            label="Channel"
            value={columnChannel}
            onChange={event => setColumnChannel(event.target.value)}
            placeholder={'Ex: y'}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            operate(
              'repeat',
              new RepeatInfo(rowFields, columnFields, {
                rowChannel,
                columnChannel,
              })
            );
            onClose();
          }}
          autoFocus
          disabled={operateDisabled()}
        >
          Operate
        </Button>
      </DialogActions>
    </Dialog>
  );
};
