import React, { useState } from 'react';
import { last } from './utils';
import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import { MainView } from './components/MainView';
import { ModeBar } from './components/ModeBar';
import './App.scss';

const App: React.FC = () => {
  const [states, setStates] = useState([{ specs: [], specCount: 0 }] as State[]);

  const handleAdd = (json: any) => {
    const { specs, specCount } = last(states);
    setStates(states.concat([{
      specs: specs.concat([{
        id: specCount,
        spec: json,
      }]),
      specCount: specCount + 1
    }]));
  };

  const handleModify = (id: number) => (json: any) => {
    const { specs, specCount } = last(states);
    setStates(states.concat([{
      specs: specs.map(spec => {
        if (spec.id === id) {
          return { id, spec: json };
        } else {
          return spec;
        }
      }),
      specCount: specCount
    }]));
  };

  const handleDelete = (id: number) => () => {
    const { specs, specCount } = last(states);
    setStates(states.concat([{
      specs: specs.filter(spec => spec.id !== id),
      specCount: specCount
    }]));
  }

  const handleUndo = () => {
    if (states.length > 1) {
      setStates(states.slice(0, states.length - 1));
    }
  }

  return (
    <div id="main">
      <div className="left-side">
        <NewSpec onAdd={handleAdd} />
        <NavigationBar
          specs={last(states).specs}
          onModify={handleModify}
          onDelete={handleDelete}
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
