import React from 'react';
import { UnitComponent } from './UnitComponent';
import { LayerComponent } from './LayerComponent';
import { ConcatComponent } from './ConcatComponent';

export const render = (view: View, operands: number[]) => {
  switch (view.getType()) {
    case 'unit':
      return <UnitComponent view={view} operands={operands} />;
    case 'layer':
      return <LayerComponent view={view} operands={operands} />;
    case 'concat':
      return <ConcatComponent view={view} operands={operands} />;
    default:
      throw new Error(`${view.getType()} view has not been implemented`);
  }
};
