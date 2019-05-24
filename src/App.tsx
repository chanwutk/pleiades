import React, { useState } from 'react';
import { success, failure } from './utils';
import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import { MainView } from './components/MainView';
import { ModeBar } from './components/ModeBar';
import * as vl from 'vega-lite';
import './App.scss';

const App: React.FC = () => {
  const [currentSpecs, setCurrentSpecs] = useState([] as RawSpec[]);
  const [specCount, setSpecCount] = useState(0);

  const handleAdd = (txt: string) => {
    try {
      const json = JSON.parse(txt);
      // TODO: can we do anything with the output of the compilation?
      // currently we only call it for side-effect (to see if it errors or not)
      vl.compile(json);
      setCurrentSpecs(currentSpecs.concat([{
        id: specCount,
        spec: json
      }]));

      setSpecCount(specCount + 1);
      return success(null);
    } catch (e) {
      if (e instanceof SyntaxError) {
        return failure(e.message);
      } else if (e.message === 'Invalid spec') {
        return failure(e.message);
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
