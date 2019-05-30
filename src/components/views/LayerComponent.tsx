import React from 'react';
import { IViewComponentProps, makeViewComponent } from './ViewComponent';
import { VegaLite } from '../VegaLite';

export const LayerComponent: React.FC<IViewComponentProps> = makeViewComponent(
  ({ view }) => {
    return <VegaLite spec={view.export()} />;
  }
);
