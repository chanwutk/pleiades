import React, { useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import { MainView } from './components/MainView';
import './App.scss';

const App: React.FC = () => {
  const [currentSpecs, setCurrentSpecs] = useState([] as any[]);

  const handleAdd = (txt: string) => {
    setCurrentSpecs(currentSpecs.concat([JSON.parse(txt)]));
  };

  return (
    <div id="main">
      <div className="left-side">
        <NewSpec onAdd={handleAdd} />
        <NavigationBar specs={currentSpecs} />
      </div>
      <div className="right-side">
        <MainView />
      </div>
    </div>
  );
};

export default App;
