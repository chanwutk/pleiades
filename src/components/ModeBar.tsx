import React from 'react';
import { RotateCcw } from 'react-feather';
import { FakeButton } from './FakeButton';

interface IModeBarProps {
  onUndo: () => void;
}

export const ModeBar: React.FC<IModeBarProps> = ({ onUndo }) => {
  return (
    <div className="mode-bar">
      <FakeButton onClick={onUndo}>
        <RotateCcw />
        &nbsp; Undo
      </FakeButton>
    </div>
  );
};
