import React from 'react';
import { SpecPreview } from './SpecPreview';

export interface INavigationBarProps {
  specs: any[]
}

const barData = {
  values: [
    { a: 'A', b: 20 },
    { a: 'B', b: 34 },
    { a: 'C', b: 55 },
    { a: 'D', b: 19 },
    { a: 'E', b: 40 },
    { a: 'F', b: 34 },
    { a: 'G', b: 91 },
    { a: 'H', b: 78 },
    { a: 'I', b: 25 }
  ]
};

export const NavigationBar: React.FC<INavigationBarProps> = ({ specs }) => {
  return (
    <div className="nav-bar">
      {specs.map(spec => <SpecPreview spec={spec} data={barData} />)}
    </div>
  );
};
