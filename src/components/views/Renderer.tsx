import React from 'react';
import { UnitComponent } from './UnitComponent';
import { LayerComponent } from './LayerComponent';
import { ConcatComponent } from './ConcatComponent';

export const render = (view: View) => {
  const getRenderer = () => {
    switch (view.type) {
      case 'unit':
        return UnitComponent;
      case 'layer':
        return LayerComponent;
      case 'concat':
        return ConcatComponent;
      default:
        throw new Error(`${view.type} view has not been implemented`);
    }
  };
  const Renderer = getRenderer();
  return <Renderer view={view} />;
};
