import React, { useState } from 'react';
import { SpecPreview } from './SpecPreview';

export interface INavigationBarProps {
  specs: RawSpec[];
  onModify: (id: number) => (json: any) => void;
  onDelete: (id: number) => () => void;
}

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
          active={spec.id === activePreview}
          onActivate={handleActivate(spec.id)}
          onModify={onModify(spec.id)}
          onDelete={onDelete(spec.id)}
        />
      ))}
    </div>
  );
};
