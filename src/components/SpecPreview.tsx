import React, { useState } from 'react';
import VegaLite from 'react-vega-lite';
import stringify from 'json-stringify-pretty-compact';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { VegaLiteEditor } from './VegaLiteEditor';
import { TooltipTable } from './TooltipTable';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { sidebarWidth } from '../variables';

export interface ISpecPreviewProps {
  spec: RawSpec;
  active: boolean;
  onToggleActive: () => void;
  onModify: (alise: string, json: any) => void;
  onDelete: () => void;
}

const MemoizedVegaLite = React.memo(VegaLite);

const useStyles = makeStyles(_ => ({
  image: {
    overflow: 'hidden',
    height: sidebarWidth
  },
  preview: {
    position: 'relative',
    border: 1,
    borderColor: ((active: boolean) => (active ? 'orange' : 'white')) as any,
    borderStyle: 'solid'
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
      <ListItem className={classes.preview} onClick={onToggleActive}>
        <TooltipTable
          table={[
            ['Data URL', spec.spec.data.url],
            ['Mark Type', spec.spec.mark]
          ]}
        >
          <div className={classes.image}>
            <MemoizedVegaLite
              spec={spec.spec}
              width={sidebarWidth}
              height={sidebarWidth}
            />
          </div>
        </TooltipTable>

        <Box position="absolute" right="0" top="0">
          <Button onClick={handleModify}>
            <Edit />
          </Button>
          <Button onClick={handleDelete}>
            <Delete />
          </Button>
        </Box>

        <div>{spec.alias}</div>
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
