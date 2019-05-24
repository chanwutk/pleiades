import React, { useState } from 'react';
import { VegaLiteEditor } from './VegaLiteEditor';
import VegaLite from 'react-vega-lite';
import classNames from 'classnames';

export interface ISpecPreviewProps {
  spec: RawSpec;
  data: any;
  active: boolean;
  onActivate: () => void;
  onModify: (json: any) => void;
}

export const SpecPreview: React.FC<ISpecPreviewProps> = ({ spec, data, active, onActivate, onModify }) => {

  const [showModal, setShowModal] = useState(false);
  const [currentSpec, setCurrentSpec] = useState('');

  const handleModify = () => {
    setCurrentSpec(JSON.stringify(spec.spec, null, 2));
    setShowModal(true);
  };

  const handleDelete = () => {
    alert('delete ' + spec.id);
  };

  return (
    <>
      <div
        className={classNames({
          'active': active,
          'preview': true
        })}
        onClick={onActivate} >
        <VegaLite spec={spec.spec} data={data} />
        <div className="preview-side">
          <button onClick={handleModify}>
            <i className="fas fa-wrench"></i>
          </button>
          <button onClick={handleDelete}>
            <i className="fas fa-trash"></i>
          </button>
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
