import React from 'react';
import { IViewComponentProps, makeViewComponent } from './ViewComponent';
import { render } from './Renderer';
import { ConcatView } from '../../SyntaxTree/ConcatView';

export const ConcatComponent: React.FC<IViewComponentProps> = makeViewComponent(
  ({ view, setIsHovering }) => {
    const concatView = view as ConcatView;
    const subViews = concatView.getSubViews();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: concatView.getOrient() === 'h' ? 'row' : 'column',
        }}
      >
        {subViews.map(subView => render(subView, setIsHovering))}
      </div>
    );
  }
);
