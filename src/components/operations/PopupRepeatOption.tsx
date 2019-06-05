import React, { useState, SetStateAction } from 'react';
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
import Remove from '@material-ui/icons/Remove';
import Add from '@material-ui/icons/Add';
import makeStyles from '@material-ui/styles/makeStyles';
import { RepeatInfo } from '../../SyntaxTree/RepeatView';

export interface IPopupRepeatOptionProps {
  isOpen: boolean;
  onClose: () => void;
  currentRepeat?: RepeatInfo;
}

const useStyles = makeStyles(() => ({
  channel: {
    width: 80,
  },
  fieldText: {
    minWidth: 100,
  },
  fieldTexts: {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
  },
  addAndRemove: {
    top: 10,
    width: 40,
    height: 40,
  },
  checkBox: {
    top: 10,
    width: 30,
    height: 30,
  },
  axisConfig: {
    display: 'flex',
    flexDirection: 'row',
    alignContent: 'flex-start',
  },
}));

export const PopupRepeatOption: React.FC<IPopupRepeatOptionProps> = ({
  isOpen,
  onClose,
  currentRepeat,
}) => {
  const classes = useStyles();
  const [checkRow, setCheckRow] = useState(false);
  const [checkColumn, setCheckColumn] = useState(false);
  const [rowFields, setRowFields] = useState<string[]>(['']);
  const [rowChannel, setRowChannel] = useState('');
  const [columnFields, setColumnFields] = useState<string[]>(['']);
  const [columnChannel, setColumnChannel] = useState('');

  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const dispatch = useDispatch();
  const operate = operateFactory(dispatch, operands);

  const handleEntering = () => {
    setCheckRow(false);
    setCheckColumn(false);
    setRowFields(['']);
    setRowChannel('');
    setColumnFields(['']);
    setColumnChannel('');

    if (currentRepeat) {
      if (currentRepeat.isRepeating('row')) {
        setCheckRow(true);
        setRowFields(currentRepeat.row);
        setRowChannel(currentRepeat.rowChannel as string);
      }
      if (currentRepeat.isRepeating('column')) {
        setCheckColumn(true);
        setColumnFields(currentRepeat.column);
        setColumnChannel(currentRepeat.columnChannel as string);
      }
    }
  };

  const operateDisabled = () =>
    (!(checkRow && rowFields.length !== 0 && rowChannel !== '') &&
      !(checkColumn && columnFields.length !== 0 && columnChannel !== '')) ||
    ((checkRow && (rowFields.length === 0 || rowChannel === '')) ||
      (checkColumn && (columnFields.length === 0 || columnChannel === '')));

  const handleTextChangeFactory = (
    current: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    index: number
  ) => event => {
    const newFields = [...current];
    newFields[index] = event.target.value;
    setter(newFields);
  };

  const axisConfigFactory = (
    check: boolean,
    checkSetter: React.Dispatch<SetStateAction<boolean>>,
    channel: string,
    channelSetter: React.Dispatch<SetStateAction<string>>,
    fields: string[],
    fieldsSetter: React.Dispatch<SetStateAction<string[]>>,
    axis: string
  ) => (
    <div className={classes.axisConfig}>
      <Checkbox
        checked={check}
        onChange={() => checkSetter(!check)}
        className={classes.checkBox}
      />
      <TextField
        label="Channel"
        value={channel}
        onChange={event => channelSetter(event.target.value)}
        className={classes.channel}
      />
      &nbsp; &nbsp;
      <div className={classes.fieldTexts}>
        {fields.map((field, index) => (
          <TextField
            label={`${axis} Field`}
            value={field}
            onChange={handleTextChangeFactory(fields, fieldsSetter, index)}
            className={classes.fieldText}
          />
        ))}
      </div>
      &nbsp; &nbsp;
      <IconButton
        onClick={() => fieldsSetter([...fields, ''])}
        className={classes.addAndRemove}
      >
        <Add />
      </IconButton>
      <IconButton
        onClick={() => {
          if (fields.length > 1) {
            const newFields = [...fields];
            newFields.splice(-1);
            fieldsSetter(newFields);
          }
        }}
        className={classes.addAndRemove}
      >
        <Remove />
      </IconButton>
    </div>
  );

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
        {axisConfigFactory(
          checkRow,
          setCheckRow,
          rowChannel,
          setRowChannel,
          rowFields,
          setRowFields,
          'Row'
        )}
        {axisConfigFactory(
          checkColumn,
          setCheckColumn,
          columnChannel,
          setColumnChannel,
          columnFields,
          setColumnFields,
          'Column'
        )}
      </DialogContent>
      <DialogActions>
        {currentRepeat ? (
          <Button
            onClick={() => {
              dispatch({
                type: 'decompose',
                operand: operands[0],
              });
              onClose();
            }}
            color="secondary"
          >
            Decompose
          </Button>
        ) : (
          <></>
        )}
        <Button
          onClick={() => {
            const info = new RepeatInfo(rowFields, columnFields, {
              rowChannel,
              columnChannel,
            });
            if (currentRepeat) {
              dispatch({ type: 'modify-info', operand: operands[0], info });
            } else {
              operate('repeat', info);
            }
            onClose();
          }}
          autoFocus
          disabled={operateDisabled()}
        >
          Repeat
        </Button>
      </DialogActions>
    </Dialog>
  );
};
