import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import stringify from 'json-stringify-pretty-compact';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { VegaLiteEditor } from './VegaLiteEditor';
import { TooltipTable } from './TooltipTable';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';

import {
  sidebarWidth,
  borderWidth,
  activeBorderColor,
  borderColor,
  hoverBorderColor,
  mouseDownBorderColor,
} from '../variables';
import { VegaLite } from './VegaLite';

export interface ISpecPreviewProps {
  spec: IBaseSpec;
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: sidebarWidth,
    '&::after': {
      display: 'block',
      position: 'absolute',
      width: sidebarWidth - 2 * borderWidth,
      backgroundImage:
        'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.75))',
      height: '75%',
      content: "''",
      bottom: 0,
      alignSelf: 'center',
    },
  },
  image: {
    overflow: 'hidden',
    height: sidebarWidth,
    width: sidebarWidth - 2 * borderWidth,
  },
  preview: {
    position: 'relative',
    userSelect: 'none',
    width: sidebarWidth,
    marginTop: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    border: borderWidth,
    borderColor: ((active: boolean) =>
      active ? activeBorderColor : borderColor) as any,
    borderStyle: 'solid',
    '&:hover': {
      borderColor: ((active: boolean) =>
        active ? activeBorderColor : hoverBorderColor) as any,
    },
    '&:active': {
      borderColor: mouseDownBorderColor,
    },
    cursor: 'pointer',
  },
  center: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)',
  },
  top: {
    position: 'absolute',
    right: 0,
    top: 0,
    '& button': {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  bottom: {
    bottom: 10,
    color: 'white',
  },
}));

export const SpecPreview: React.FC<ISpecPreviewProps> = ({ spec }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');
  const [currentAlias, setCurrentAlias] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const dispatch = useDispatch();

  const active = useSelector((state: IGlobalState) =>
    state.current.operands.includes(spec.id)
  );

  const handleModify = () => {
    setCurrentSpec(stringify(spec.spec));
    setCurrentAlias(spec.alias);
    setShowModal(true);
  };

  const handleDeleteMouseEnter = () => setIsDeleting(true);
  const handleDeleteMouseLeave = () => setIsDeleting(false);

  const handleDelete = () => {
    dispatch({ type: 'delete-spec', id: spec.id });
  };

  const handleSuccess = (alias: string, json: IRawSpec) => {
    dispatch({ type: 'modify-spec', json, alias, id: spec.id });
  };

  const handleToggleActive = () => {
    if (!isDeleting) {
      dispatch({ type: 'select-operand', operand: spec.id });
    }
  };

  const markToString = (mark: string | { type: string }) => {
    if (typeof mark === 'string') {
      return mark;
    } else {
      return mark.type;
    }
  };

  const dataToString = (data: IRawData) => {
    return 'url' in data ? data['url'] : 'Embeded data';
  };

  const classes = useStyles(active);
  const table = spec.spec.mark
    ? [
        ['Data URL', dataToString(spec.spec.data)],
        ['Mark Type', markToString(spec.spec.mark)],
      ]
    : [['Composite View', getCompositeViewType(spec.spec)]];

  return (
    <>
      <ListItem
        disableGutters
        className={classes.preview}
        onClick={handleToggleActive}
      >
        <TooltipTable table={table}>
          <div className={classes.wrapper}>
            <div className={classes.image}>
              <VegaLite
                spec={spec.spec}
                // This size restriction makes the elements in visualized spec layed out incorrectly
                width={sidebarWidth}
                height={sidebarWidth}
              />
            </div>
          </div>
        </TooltipTable>

        <div className={classes.top}>
          <Fab size="small" color="primary" onClick={handleModify}>
            <Edit />
          </Fab>
          <Fab
            size="small"
            color="secondary"
            onClick={handleDelete}
            onMouseEnter={handleDeleteMouseEnter}
            onMouseLeave={handleDeleteMouseLeave}
          >
            <Delete />
          </Fab>
        </div>

        <div className={classes.center + ' ' + classes.bottom}>
          {spec.alias}
        </div>
      </ListItem>
      <VegaLiteEditor
        showModal={showModal}
        setShowModal={setShowModal}
        onSuccess={handleSuccess}
        value={currentSpec}
        setValue={setCurrentSpec}
        alias={currentAlias}
        setAlias={setCurrentAlias}
      />
    </>
  );
};

function getCompositeViewType(spec): string {
  if (spec.layer) return 'Layer View';
  else if (spec.concat || spec.hconcat || spec.vconcat) return 'Concat View';
  else if (spec.spec) {
    if (spec.facet) return 'Facet View';
    else return 'Repeat View';
  } else return 'Undefined';
}
