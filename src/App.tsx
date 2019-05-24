import React, { useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import { MainView } from './components/MainView';
import { ModeBar } from './components/ModeBar';
import './App.scss';

const App: React.FC = () => {
  const [currentSpecs, setCurrentSpecs] = useState([] as RawSpec[]);
  const [specCount, setSpecCount] = useState(0);

  const handleAdd = (json: any) => {
    setCurrentSpecs(currentSpecs.concat([{
      id: specCount,
      spec: json
    }]));
    setSpecCount(specCount + 1);
  };

  const handleModify = (id: number) => (json: any) => {
    setCurrentSpecs(currentSpecs.map(spec => {
      if (spec.id === id) {
        return {
          id,
          spec: json
        };
      } else {
        return spec;
      }
    }));
  };

  const handleDelete = (id: number) => () => {
    setCurrentSpecs(currentSpecs.filter(spec => spec.id !== id));
  }

  return (
    <div id="main">
      <div className="left-side">
        <NewSpec onAdd={handleAdd} />
        <NavigationBar
          specs={currentSpecs}
          onModify={handleModify}
          onDelete={handleDelete} />

      </div>
      <div className="right-side">
        <ModeBar />
        <MainView />
      </div>
    </div>
  );
};

export default App;
