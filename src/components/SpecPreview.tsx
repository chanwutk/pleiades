import React, { useState } from 'react';
import VegaLite from 'react-vega-lite';
import classNames from 'classnames';
import stringify from 'json-stringify-pretty-compact';
import { Edit, Trash2 } from 'react-feather';
import { VegaLiteEditor } from './VegaLiteEditor';
import { FakeButton } from './FakeButton';
import { previewWidth } from '../App.scss';
import { TooltipTable } from './TooltipTable';

export interface ISpecPreviewProps {
  spec: RawSpec;
  active: boolean;
  onActivate: () => void;
  onModify: (json: any) => void;
  onDelete: () => void;
}

const MemoizedVegaLite = React.memo(VegaLite);

export const SpecPreview: React.FC<ISpecPreviewProps> = ({
  spec,
  active,
  onActivate,
  onModify,
  onDelete
}) => {
  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');

  const handleModify = () => {
    setCurrentSpec(stringify(spec.spec));
    setShowModal(true);
  };

  const handleDelete = () => {
    onDelete();
  };

  return (
    <>
      <div
        className={classNames({ active: active, preview: true })}
        onClick={onActivate}
      >
        <div className="preview-image" data-tip data-for={spec.id + ''}>
          <MemoizedVegaLite
            spec={spec.spec}
            width={+previewWidth}
            height={+previewWidth}
          />
        </div>

        <TooltipTable id={spec.id + ''}>
          {[['Data URL', spec.spec.data.url], ['Mark Type', spec.spec.mark]]}
        </TooltipTable>

        <div className="preview-side">
          <FakeButton onClick={handleModify}>
            <Edit />
          </FakeButton>
          <FakeButton onClick={handleDelete}>
            <Trash2 />
          </FakeButton>
        </div>
      </div>
      <VegaLiteEditor
        showModal={showModal}
        setShowModal={setShowModal}
        contentLabel="Modify Spec"
        onSuccess={onModify}
        value={currentSpec}
        setValue={setCurrentSpec}
      />
    </>
  );
};
