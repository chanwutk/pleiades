import React, { useState } from 'react';
import { SpecPreview } from './SpecPreview';

export interface INavigationBarProps {
  specs: RawSpec[];
  onModify: (id: number) => (json: any) => void;
  onDelete: (id: number) => () => void;
}

export const NavigationBar: React.FC<INavigationBarProps> = ({
  specs,
  onModify,
  onDelete
}) => {
  const [activePreview, setActivePreview] = useState<number | null>(null);

  const handleActivate = (id: number) => () =>
    setActivePreview(activePreview === id ? null : id);

  return (
    <div className="nav-bar">
      {specs.map(spec => (
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
