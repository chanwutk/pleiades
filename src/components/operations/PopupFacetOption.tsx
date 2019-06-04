import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { FacetInfo } from '../../SyntaxTree/FacetView';
import { operateFactory } from './Utils';
import {
  Dialog,
  DialogTitle,
  IconButton,
  DialogActions,
  DialogContent,
  Checkbox,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  DialogContentText,
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';
import makeStyles from '@material-ui/styles/makeStyles';

export interface IPopupFacetOptionProps {
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles(() => ({
  typeSelector: {
    minWidth: 60,
  },
  checkBox: {
    top: 10,
  },
}));

export const PopupFacetOption: React.FC<IPopupFacetOptionProps> = ({
  isOpen,
  onClose,
}) => {
  const classes = useStyles();
  const [checkRow, setCheckRow] = useState(false);
  const [checkColumn, setCheckColumn] = useState(false);
  const [rowField, setRowField] = useState('');
  const [rowType, setRowType] = useState('');
  const [columnField, setColumnField] = useState('');
  const [columnType, setColumnType] = useState('');

  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const operate = operateFactory(useDispatch(), operands);

  const handleEntering = () => {
    setCheckRow(false);
    setCheckColumn(false);
    setRowField('');
    setRowType('');
    setColumnField('');
    setColumnType('');
  };

  const operateDisabled = () =>
    (!(checkRow && rowField !== '' && rowType !== '') &&
      !(checkColumn && columnField !== '' && columnType !== '')) ||
    ((checkRow && (rowField === '' || rowType === '')) ||
      (checkColumn && (columnField === '' || columnType === '')));

  return (
    <Dialog
      open={isOpen}
      onEntering={handleEntering}
      aria-labelledby="facet-dialog-title"
    >
      <DialogTitle id="facet-dialog-title">
        <>Facet</>
        <IconButton
          onClick={onClose}
          style={{ right: 10, top: 7, position: 'absolute' }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Choose Field(s) and Type(s) to facet.
        </DialogContentText>
        <div>
          <Checkbox
            checked={checkRow}
            onChange={() => setCheckRow(!checkRow)}
            className={classes.checkBox}
          />
          <TextField
            label="Row Field"
            value={rowField}
            onChange={event => setRowField(event.target.value)}
            placeholder={'Ex: Origin'}
          />
          &nbsp; &nbsp;
          <FormControl>
            <InputLabel htmlFor="row-type">Type</InputLabel>
            <Select
              value={rowType}
              onChange={event => setRowType(event.target.value as string)}
              inputProps={{
                name: 'type',
                id: 'row-type',
              }}
              className={classes.typeSelector}
            >
              <MenuItem value={'nominal'}>Nominal</MenuItem>
              <MenuItem value={'ordinal'}>Ordinal</MenuItem>
              <MenuItem value={'quantitative'}>Quantitative</MenuItem>
              <MenuItem value={'temporal'}>Temporal</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <Checkbox
            checked={checkColumn}
            onChange={() => setCheckColumn(!checkColumn)}
            className={classes.checkBox}
          />
          <TextField
            label="Column Field"
            value={columnField}
            onChange={event => setColumnField(event.target.value)}
            placeholder={'Ex: Cylinders'}
          />
          &nbsp; &nbsp;
          <FormControl>
            <InputLabel htmlFor="column-type">Type</InputLabel>
            <Select
              value={columnType}
              onChange={event => setColumnType(event.target.value as string)}
              inputProps={{
                name: 'type',
                id: 'column-type',
              }}
              className={classes.typeSelector}
            >
              <MenuItem value={'nominal'}>Nominal</MenuItem>
              <MenuItem value={'ordinal'}>Ordinal</MenuItem>
              <MenuItem value={'quantitative'}>Quantitative</MenuItem>
              <MenuItem value={'temporal'}>Temporal</MenuItem>
            </Select>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            operate(
              'facet',
              new FacetInfo({
                ...(checkColumn
                  ? { column: { field: columnField, type: columnType } }
                  : {}),
                ...(checkRow
                  ? { row: { field: rowField, type: rowType } }
                  : {}),
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
