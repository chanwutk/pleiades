import React from 'react';
import VegaLite from 'react-vega-lite';
import classNames from 'classnames';

export interface ISpecPreviewProps {
  spec: RawSpec;
  data: any;
  active: boolean;
  onActivate: () => void;
}

export const SpecPreview: React.FC<ISpecPreviewProps> = ({ spec, data, active, onActivate }) => {

  const handleModify = () => {
    alert('modifying ' + spec.id);
  };

  const handleDelete = () => {
    alert('delete ' + spec.id);
  };
  return (
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
  );
};
