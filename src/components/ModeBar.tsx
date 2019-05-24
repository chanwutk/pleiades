import React from 'react';
import { RotateCcw, RotateCw } from 'react-feather';
import { FakeButton } from './FakeButton';

interface IModeBarProps {
  onUndo: () => void;
  onRedo: () => void;
}

export const ModeBar: React.FC<IModeBarProps> = ({ onUndo, onRedo }) => {
  return (
    <div className="mode-bar">
      <FakeButton onClick={onUndo}>
        <RotateCcw />
        &nbsp; Undo
      </FakeButton>
      <FakeButton onClick={onRedo}>
        <RotateCw />
        &nbsp; Redo
      </FakeButton>
    </div>
  );
};
