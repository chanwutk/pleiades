import React from 'react';
import VegaLite from 'react-vega-lite';

export interface ISpecPreviewProps {
  spec: RawSpec;
  data: any;
  active: boolean;
  onClick: () => void;
}

export const SpecPreview: React.FC<ISpecPreviewProps> = ({ spec, data, active, onClick }) => {
  return (
    <div
      className={active ? 'preview-active' : ''}
      onClick={onClick} >
      <VegaLite spec={spec.spec} data={data} />
    </div>
  );
};
