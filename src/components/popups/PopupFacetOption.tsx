import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { FacetInfo } from '../../SyntaxTree/FacetView';
import { operateFactory } from '../operations/Utils';
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
  currentFacet?: FacetInfo;
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
  currentFacet,
}) => {
  const classes = useStyles();
  const [checkRow, setCheckRow] = useState(false);
  const [checkColumn, setCheckColumn] = useState(false);
  const [rowField, setRowField] = useState('');
  const [rowType, setRowType] = useState('');
  const [columnField, setColumnField] = useState('');
  const [columnType, setColumnType] = useState('');

  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const dispatch = useDispatch();
  const operate = operateFactory(dispatch, operands);

  const handleEntering = () => {
    setCheckRow(false);
    setCheckColumn(false);
    setRowField('');
    setRowType('');
    setColumnField('');
    setColumnType('');

    if (currentFacet) {
      if (currentFacet['row']) {
        setCheckRow(true);
        setRowField(currentFacet['row']['field']);
        setRowType(currentFacet['row']['type']);
      }
      if (currentFacet['column']) {
        setCheckColumn(true);
        setColumnField(currentFacet['column']['field']);
        setColumnType(currentFacet['column']['type']);
      }
    }
  };

  const axisConfigFactory = (
    check: boolean,
    checkSetter: React.Dispatch<React.SetStateAction<boolean>>,
    field: string,
    fieldSetter: React.Dispatch<React.SetStateAction<string>>,
    type: string,
    typeSetter: React.Dispatch<React.SetStateAction<string>>,
    axis: 'Row' | 'Column'
  ) => (
    <div>
      <Checkbox
        checked={check}
        onChange={() => checkSetter(!check)}
        className={classes.checkBox}
      />
      <TextField
        label={`${axis} Field`}
        value={field}
        onChange={event => fieldSetter(event.target.value)}
      />
      &nbsp; &nbsp;
      <FormControl>
        <InputLabel htmlFor="row-type">Type</InputLabel>
        <Select
          value={type}
          onChange={event => typeSetter(event.target.value as string)}
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
  );

  const handleFacet = () => {
    const info = new FacetInfo({
      ...(checkColumn
        ? { column: { field: columnField, type: columnType } }
        : {}),
      ...(checkRow ? { row: { field: rowField, type: rowType } } : {}),
    });
    if (currentFacet) {
      dispatch({ type: 'modify-info', operand: operands[0], info });
    } else {
      operate('facet', info);
    }
    onClose();
  };

  const handleDecompose = () => {
    dispatch({
      type: 'decompose',
      operand: operands[0],
    });
    onClose();
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
        {axisConfigFactory(
          checkRow,
          setCheckRow,
          rowField,
          setRowField,
          rowType,
          setRowType,
          'Row'
        )}
        {axisConfigFactory(
          checkColumn,
          setCheckColumn,
          columnField,
          setColumnField,
          columnType,
          setColumnType,
          'Column'
        )}
      </DialogContent>
      <DialogActions>
        {currentFacet ? (
          <Button onClick={handleDecompose} color="secondary">
            Decompose
          </Button>
        ) : (
          <></>
        )}
        <Button onClick={handleFacet} autoFocus disabled={operateDisabled()}>
          Facet
        </Button>
      </DialogActions>
    </Dialog>
  );
};
