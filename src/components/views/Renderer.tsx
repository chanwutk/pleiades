import React from 'react';
import { UnitComponent } from './UnitComponent';
import { LayerComponent } from './LayerComponent';
import { ConcatComponent } from './ConcatComponent';
import { FacetComponent } from './FacetComponent';
import { RepeatComponent } from './RepeatConponent';

export const render = (
  view: View,
  setIsHovering?: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const getRenderer = () => {
    switch (view.type) {
      case 'unit':
        return UnitComponent;
      case 'layer':
        return LayerComponent;
      case 'concat':
        return ConcatComponent;
      case 'facet':
        return FacetComponent;
      case 'repeat':
        return RepeatComponent;
      default:
        throw new Error(`${view.type} view has not been implemented`);
    }
  };
  const Renderer = getRenderer();
  return <Renderer view={view} setIsHovering={setIsHovering} />;
};
