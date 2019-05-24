import React from 'react';
import VegaLite from 'react-vega-lite';

export interface ISpecPreviewProps {
  spec: any;
  data: any;
  active: boolean;
  onClick: () => void;
}

export const SpecPreview: React.FC<ISpecPreviewProps> = ({ spec, data, active, onClick }) => {
  return (
    <div
      className={active ? 'preview-active' : ''}
      onClick={onClick} >
      <VegaLite spec={spec} data={data} />
    </div>
  );
};
