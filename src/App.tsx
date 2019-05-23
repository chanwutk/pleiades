import React, { useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import { MainView } from './components/MainView';
import { ModeBar } from './components/ModeBar';
import * as vl from 'vega-lite';
import './App.scss';

const App: React.FC = () => {
  const [currentSpecs, setCurrentSpecs] = useState([] as any[]);

  const handleAdd = (txt: string) => {
    try {
      const json = JSON.parse(txt);
      // TODO: can we do anything with the output of the compilation?
      // currently we only call it for side-effect (to see if it errors or not)
      vl.compile(json);
      setCurrentSpecs(currentSpecs.concat([json]));
      return true;
    } catch (e) {
      if (e instanceof SyntaxError) {
        return false;
      } else if (e.message === 'Invalid spec') {
        return false;
      } else {
        throw e;
      }
    }
  };

  return (
    <div id="main">
      <div className="left-side">
        <NewSpec onAdd={handleAdd} />
        <NavigationBar specs={currentSpecs} />
      </div>
      <div className="right-side">
        <ModeBar />
        <MainView />
      </div>
    </div>
  );
};

export default App;
