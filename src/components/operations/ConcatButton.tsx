import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import { operateFactory } from './Utils';
import { IOperationProps } from '../OperationBar';
import { Menu, MenuItem } from '@material-ui/core';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

export const ConcatButton: React.FC<IOperationProps> = ({
  navBarOperands,
  mainViewOperands,
}) => {
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const operate = operateFactory(useDispatch(), operands);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickConcat = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectOption = (
    option: InsertOrder,
    orient: ConcatOrient
  ) => () => {
    handleMenuClose();
    operate('concat', { option, orient });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const concatDisabled =
    mainViewOperands.length !== 1 || navBarOperands.length !== 1;

  return (
    <>
      <Button
        onClick={handleClickConcat}
        disabled={concatDisabled}
        aria-owns={anchorEl ? 'layer-menu' : undefined}
        aria-haspopup="true"
      >
        Concat
        <ArrowDropDown />
      </Button>

      <Menu
        id="layer-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={handleSelectOption('prepend', 'h')}>
          On Left
        </MenuItem>
        <MenuItem onClick={handleSelectOption('append', 'h')}>
          On Right
        </MenuItem>
        <MenuItem onClick={handleSelectOption('prepend', 'v')}>On Top</MenuItem>
        <MenuItem onClick={handleSelectOption('append', 'v')}>
          On Bottom
        </MenuItem>
      </Menu>
    </>
  );
};
