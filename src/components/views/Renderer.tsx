import React from 'react';
import { UnitComponent } from './UnitComponent';
import { LayerComponent } from './LayerComponent';
import { ConcatComponent } from './ConcatComponent';

export const render = (view: View, operands: number[]) => {
  const getRenderer = () => {
    switch (view.getType()) {
      case 'unit':
        return UnitComponent;
      case 'layer':
        return LayerComponent;
      case 'concat':
        return ConcatComponent;
      default:
        throw new Error(`${view.getType()} view has not been implemented`);
    }
  };
  const Renderer = getRenderer();
  return <Renderer view={view} operands={operands} />;
};
