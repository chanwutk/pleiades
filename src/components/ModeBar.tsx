import React, { useState } from 'react';
import { RotateCcw, RotateCw } from 'react-feather';
import { FakeButton } from './FakeButton';

interface IModeBarProps {
  onUndo: () => void;
  onRedo: () => void;
}

export const ModeBar: React.FC<IModeBarProps> = ({ onUndo, onRedo }) => {
  const [currentMode, setCurrentMode] = useState('');

  return (
    <div className="mode-bar">
      <div className="mode-group">
        <FakeButton onClick={(() => { })}>Layer</FakeButton>
        <FakeButton onClick={(() => { })}>Concat</FakeButton>
        <FakeButton onClick={(() => { })}>Repeat</FakeButton>
        <FakeButton onClick={(() => { })}>Facet</FakeButton>
      </div>
      <div className="undo-redo-group">
        <FakeButton onClick={onUndo}>
          <RotateCcw />
          &nbsp; Undo
        </FakeButton>
        <FakeButton onClick={onRedo}>
          <RotateCw />
          &nbsp; Redo
        </FakeButton>
      </div>
    </div>
  );
};
