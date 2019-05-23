import React from 'react';
import VegaLite from 'react-vega-lite';

export interface ISpecPreviewProps {
  spec: any;
  data: any;
}

export const SpecPreview: React.FC<ISpecPreviewProps> = ({ spec, data }) => {
  return (
    <VegaLite spec={spec} data={data} />
  );
};
