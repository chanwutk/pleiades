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
} from '@material-ui/core';
import Close from '@material-ui/icons/Close';

export interface IPopupFacetOptionProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PopupFacetOption: React.FC<IPopupFacetOptionProps> = ({
  isOpen,
  onClose,
}) => {
  const [checkRow, setCheckRow] = useState(false);
  const [checkColumn, setCheckColumn] = useState(false);
  const [rowField, setRowField] = useState('');
  const [rowType, setRowType] = useState('');
  const [columnField, setColumnField] = useState('');
  const [columnType, setColumnType] = useState('');

  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const operate = operateFactory(useDispatch(), operands);

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {'Choose Face Fields & Encoding Channels'}
        <IconButton onClick={() => onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <div>
          <Checkbox
            checked={checkRow}
            onChange={() => setCheckRow(!checkRow)}
          />
          <TextField
            id="standard-name"
            label="Row Field"
            value={rowField}
            onChange={event => setRowField(event.target.value)}
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
          />
          <TextField
            id="standard-name"
            label="Column Field"
            value={columnField}
            onChange={event => setColumnField(event.target.value)}
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
          // Replace this fake facet as interation to select orientation and fields
          onClick={() => {
            operate(
              'facet',
              new FacetInfo({
                column: { field: 'Cylinders', type: 'ordinal' },
                row: { field: 'Origin', type: 'nominal' },
              })
            );
            onClose();
          }}
          autoFocus
        >
          Facet
        </Button>
      </DialogActions>
    </Dialog>
  );
};
