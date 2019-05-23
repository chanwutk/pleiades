import React, { useState } from 'react';
import VegaLite from 'react-vega-lite';
import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import './App.css';

const barData = {
  values: [
    { a: 'A', b: 20 },
    { a: 'B', b: 34 },
    { a: 'C', b: 55 },
    { a: 'D', b: 19 },
    { a: 'E', b: 40 },
    { a: 'F', b: 34 },
    { a: 'G', b: 91 },
    { a: 'H', b: 78 },
    { a: 'I', b: 25 }
  ]
};

const App: React.FC = () => {
  const [currentSpecs, setCurrentSpecs] = useState([] as any[]);

  const handleAdd = (txt: string) => {
    setCurrentSpecs(currentSpecs.concat([JSON.parse(txt)]));
  };

  return (
    <div>
      <NewSpec onAdd={handleAdd} />
      <NavigationBar />
      {currentSpecs.map(spec => <VegaLite spec={spec} data={barData} />)}
    </div>
  );
};

export default App;
