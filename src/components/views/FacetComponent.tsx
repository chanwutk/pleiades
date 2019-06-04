import React from 'react';
import { IViewComponentProps, makeViewComponent } from './ViewComponent';
import { VegaLite } from '../VegaLite';

export const FacetComponent: React.FC<IViewComponentProps> = makeViewComponent(
  ({ view }) => <VegaLite spec={view.export()} />
);
