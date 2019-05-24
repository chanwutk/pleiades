import React, { useState } from 'react';
import { VegaLiteEditor } from './VegaLiteEditor';
import VegaLite from 'react-vega-lite';
import classNames from 'classnames';
import stringify from 'json-stringify-pretty-compact';
import { Edit, Trash2 } from 'react-feather';

export interface ISpecPreviewProps {
  spec: RawSpec;
  active: boolean;
  onActivate: () => void;
  onModify: (json: any) => void;
  onDelete: () => void;
}

const MemoizedVegaLite = React.memo(VegaLite);

export const SpecPreview: React.FC<ISpecPreviewProps> = ({ spec, active, onActivate, onModify, onDelete }) => {

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
        className={classNames({
          'active': active,
          'preview': true
        })}
        onClick={onActivate} >
        <div className="preview-image">
          <MemoizedVegaLite spec={spec.spec} />
        </div>
        <div className="preview-side">
          <div className="fake-button" onClick={handleModify}>
            <Edit />
          </div>
          <div className="fake-button" onClick={handleDelete}>
            <Trash2 />
          </div>
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
