import React from 'react';

export interface ISpecPreviewProps {
  onClick: () => void;
}

export const FakeButton: React.FC<ISpecPreviewProps> = ({ onClick, children }) => {
  return (
    <div className="fake-button" onClick={onClick}>
      {children}
    </div>
  );
};
