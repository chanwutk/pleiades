import React, { useState } from 'react';
import VegaLite from 'react-vega-lite';
import Vega from 'react-vega';
import stringify from 'json-stringify-pretty-compact';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { VegaLiteEditor } from './VegaLiteEditor';
import { TooltipTable } from './TooltipTable';
import Fab from '@material-ui/core/Fab';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { sidebarWidth } from '../variables';
import shallowequal from 'shallowequal';
import { RawSpec } from '../global';

export interface ISpecPreviewProps {
  spec: RawSpec;
  active: boolean;
  onToggleActive: () => void;
  onModify: (alise: string, json: any) => void;
  onDelete: () => void;
}

export const MemoizedVegaLite = React.memo(
  VegaLite,
  ({ spec: xSpec, ...xRest }, { spec: ySpec, ...yRest }) => {
    return shallowequal(xRest, yRest) && Vega.isSameSpec(xSpec, ySpec);
  }
);

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
    border: 1,
    borderColor: ((active: boolean) => (active ? 'orange' : 'white')) as any,
    borderStyle: 'solid'
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

export const SpecPreview: React.FC<ISpecPreviewProps> = ({
  spec,
  onToggleActive,
  onModify,
  onDelete,
  active
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');
  const [currentAlias, setCurrentAlias] = useState('');

  const handleModify = () => {
    setCurrentSpec(stringify(spec.spec));
    setCurrentAlias(spec.alias);
    setShowModal(true);
  };

  const handleDelete = () => {
    onDelete();
  };

  const classes = useStyles(active);

  return (
    <>
      <ListItem
        disableGutters
        className={classes.preview}
        onClick={onToggleActive}
      >
        <TooltipTable
          table={[
            ['Data URL', spec.spec.data.url],
            ['Mark Type', spec.spec.mark]
          ]}
        >
          <div className={classes.wrapper}>
            <div className={classes.image}>
              <MemoizedVegaLite
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
        onSuccess={onModify}
        value={currentSpec}
        setValue={setCurrentSpec}
        alias={currentAlias}
        setAlias={setCurrentAlias}
      />
    </>
  );
};
