import React, { useState } from 'react';
import * as R from 'ramda';
import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import { MainView } from './components/MainView';
import { ModeBar } from './components/ModeBar';
import './App.scss';

const App: React.FC = () => {
  const [states, setStates] = useState<State[]>([{ specs: [], specCount: 0 }]);
  const [redoStack, setRedoStack] = useState<State[]>([]);

  const addState = (state: State) => {
    setStates(R.prepend(state, states));
    setRedoStack([]);
  };

  const handleAddSpec = (json: any) => {
    const { specs, specCount } = states[0];
    addState({
      specs: R.append({ id: specCount, spec: json }, specs),
      specCount: specCount + 1
    });
  };

  const handleModifySpec = (id: number) => (json: any) => {
    addState(
      R.over(
        R.lensProp('specs'),
        (specs: RawSpec[]) =>
          specs.map(spec => (spec.id === id ? { id, spec: json } : spec)),
        states[0]
      )
    );
  };

  const handleDeleteSpec = (id: number) => () => {
    addState(
      R.over(
        R.lensProp('specs'),
        (specs: RawSpec[]) => specs.filter(spec => spec.id !== id),
        states[0]
      )
    );
  };

  const handleUndo = () => {
    if (states.length > 1) {
      setRedoStack(R.prepend(states[0], redoStack));
      setStates(states.slice(1));
    }
  };

  const handleRedo = () => {
    if (redoStack.length > 0) {
      setStates(R.prepend(redoStack[0], states));
      setRedoStack(redoStack.slice(1));
    }
  };

  return (
    <div id="main">
      <div className="left-side">
        <NewSpec onAdd={handleAddSpec} />
        <NavigationBar
          specs={states[0].specs}
          onModify={handleModifySpec}
          onDelete={handleDeleteSpec}
        />
      </div>
      <div className="right-side">
        <ModeBar onUndo={handleUndo} onRedo={handleRedo} />
        <MainView />
      </div>
    </div>
  );
};

export default App;
