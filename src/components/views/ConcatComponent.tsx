import React from 'react';
import { IViewComponentProps, makeViewComponent } from './ViewComponent';
import { VegaLite } from '../VegaLite';
import { render } from './Renderer'; 
import { ConcatView } from '../../SyntaxTree/ConcatView';

export const ConcatComponent: React.FC<IViewComponentProps> = makeViewComponent(
  ({ view }) => { 
    let subViews: any = (view as ConcatView).getSubViews();
    
    subViews.forEach((v) => {
      render(v); 
    });
  }
);
