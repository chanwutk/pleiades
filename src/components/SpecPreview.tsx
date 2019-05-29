import React, { useState, useContext } from 'react';
import stringify from 'json-stringify-pretty-compact';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { VegaLiteEditor } from './VegaLiteEditor';
import { TooltipTable } from './TooltipTable';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';

import { AppDispatch } from '../contexts';
import { sidebarWidth } from '../variables';
import { VegaLite } from './VegaLite';

export interface ISpecPreviewProps {
  spec: IBaseSpec;
  operand1Id: number | null;
  active: boolean;
}

const useStyles = makeStyles(theme => ({
  wrapper: {
    height: sidebarWidth,
    '&::after': {
      display: 'block',
      position: 'relative',
      marginTop: '-57%',
      width: sidebarWidth,
      backgroundImage:
        'linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.75))',
      height: '75%',
      content: "''"
    }
  },
  image: {
    overflow: 'hidden',
    height: sidebarWidth
  },
  preview: {
    position: 'relative',
    userSelect: 'none',
    border: 2,
    borderColor: ((active: boolean) => active ? '#3caea3' : 'transparent') as any,
    borderStyle: 'solid',
    '&:hover': {
      borderColor: '#f6d55c'
    },
    '&:active': {
      borderColor: '#ed553b'
    }
  },
  center: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0)'
  },
  top: {
    position: 'absolute',
    right: 0,
    top: 0,
    '& button': {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1)
    }
  },
  bottom: {
    bottom: 10,
    color: 'white'
  }
}));

export const SpecPreview: React.FC<ISpecPreviewProps> = ({ spec, operand1Id, active }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');
  const [currentAlias, setCurrentAlias] = useState('');

  const handleModify = () => {
    setCurrentSpec(stringify(spec.spec));
    setCurrentAlias(spec.alias);
    setShowModal(true);
  };

  const dispatch = useContext(AppDispatch);

  const handleDelete = () => {
    dispatch({ type: 'delete-spec', id: spec.id });
  };

  const handleSuccess = (alias: string, json: any) => {
    dispatch({ type: 'modify-spec', json, alias, id: spec.id });
  };

  const handleToggleActive = () => {
    const { id } = spec;
    dispatch({ type: 'select-operand1', id: id === operand1Id ? null : id });
  };

  const classes = useStyles(active);

  return (
    <>
      <ListItem
        disableGutters
        className={classes.preview}
        onClick={handleToggleActive}
      >
        <TooltipTable
          table={[
            ['Data URL', spec.spec.data.url],
            ['Mark Type', spec.spec.mark]
          ]}
        >
          <div className={classes.wrapper}>
            <div className={classes.image}>
              <VegaLite
                spec={spec.spec}
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
          <Fab size="small" color="secondary" onClick={handleDelete}>
            <Delete />
          </Fab>
        </div>

        <div className={classes.center + ' ' + classes.bottom}>
          {spec.alias}
        </div>
      </ListItem>
      <Divider />
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
