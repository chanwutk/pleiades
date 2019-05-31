import React from 'react';
import { IViewComponentProps, makeViewComponent } from './ViewComponent';
import { VegaLite } from '../VegaLite';

export const RepeatComponent: React.FC<IViewComponentProps> = makeViewComponent(
  ({ view }) => {
    return <VegaLite spec={view.export()} />;
  }
);
