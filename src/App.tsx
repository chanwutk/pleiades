import React, { useState } from 'react';
import * as R from 'ramda';
import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import { MainView } from './components/MainView';
import { ModeBar } from './components/ModeBar';
import './App.scss';

const App: React.FC = () => {
  const [states, setStates] = useState([{ specs: [], specCount: 0 }] as State[]);

  const handleAddSpec = (json: any) => {
    const { specs, specCount } = states[0];
    const newState = {
      specs: R.append({ id: specCount, spec: json }, specs),
      specCount: specCount + 1,
    };
    setStates(R.prepend(newState, states));
  };

  const handleModifySpec = (id: number) => (json: any) => {
    const newState = R.over(R.lensProp('specs'), specs =>
      specs.map((spec: RawSpec) => {
        if (spec.id === id) {
          return { id, spec: json };
        } else {
          return spec;
        }
      }),
      states[0]
    );
    setStates(R.prepend(newState, states));
  };

  const handleDeleteSpec = (id: number) => () => {
    const newState = R.over(R.lensProp('specs'), specs =>
      specs.filter((spec: RawSpec) => spec.id !== id),
      states[0]
    );
    setStates(R.prepend(newState, states));
  }

  const handleUndo = () => {
    if (states.length > 1) {
      setStates(states.slice(1));
    }
  }

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
        <ModeBar onUndo={handleUndo} />
        <MainView />
      </div>
    </div>
  );
};

export default App;
