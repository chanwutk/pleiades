import React, { useState } from 'react';
import { SpecPreview } from './SpecPreview';

export interface INavigationBarProps {
  specs: RawSpec[];
  onModify: (id: number) => (json: any) => void;
  onDelete: (id: number) => () => void;
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

export const NavigationBar: React.FC<INavigationBarProps> = ({ specs, onModify, onDelete }) => {
  const [activePreview, setActivePreview] = useState(null);

  const handleActivate = id => () => {
    if (activePreview === id) {
      setActivePreview(null);
    } else {
      setActivePreview(id);
    }
  }

  return (
    <div className="nav-bar">
      {specs.map((spec) => (
        <SpecPreview
          key={spec.id}
          spec={spec}
          data={barData}
          active={spec.id === activePreview}
          onActivate={handleActivate(spec.id)}
          onModify={onModify(spec.id)}
          onDelete={onDelete(spec.id)}
        />
      ))}
    </div>
  );
};
