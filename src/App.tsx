import React, { useState } from 'react';
import { hot } from 'react-hot-loader';
import * as R from 'ramda';
import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import { MainView } from './components/MainView';
import { ModeBar } from './components/ModeBar';
import { makeStyles } from '@material-ui/core/styles';
import { sidebarWidth } from './variables';
import { State, RawSpec, Mode } from './global';

const useStyles = makeStyles(theme => ({
  root: {
    height: 600,
    display: 'flex'
  },
  left: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: sidebarWidth,
    marginRight: theme.spacing(1)
  },
  right: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  }
}));

const App: React.FC = () => {
  const [states, setStates] = useState<State[]>([{ specs: [], specCount: 0, mode: "initial", mainViewElements: null }]);
  const [redoStack, setRedoStack] = useState<State[]>([]);
  const [viz, setViz] = useState<React.FC | null>(null);

  const addState = (state: State) => {
    setStates(R.prepend(state, states));
    setRedoStack([]);
  };

  const handleAddSpec = (alias: string, json: any) => {
    const { specs, specCount, ...otherElements } = states[0];
    addState({
      specs: R.append({ id: specCount, spec: json, alias }, specs),
      specCount: specCount + 1,
      ...otherElements
    });
  };

  const handleSelectMode = (mode: Mode) => {
    const { mode: _mode, ...otherElements } = states[0];
    if (!_mode) {
      addState({
        mode,
        ...otherElements
      });
    }
  };

  const handleModifySpec = (id: number) => (alias: string, json: any) => {
    addState(
      R.over(
        R.lensProp('specs'),
        (specs: RawSpec[]) =>
          specs.map(
            spec => (spec.id === id ? { id, spec: json, alias } : spec)
          ),
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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <NewSpec onAdd={handleAddSpec} />
        <NavigationBar
          specs={states[0].specs}
          onModify={handleModifySpec}
          onDelete={handleDeleteSpec}
        />
      </div>
      <div className={classes.right}>
        <ModeBar
          onUndo={handleUndo}
          onRedo={handleRedo}
          onSelectMode={handleSelectMode}
          state={states[0]}
        />
        <MainView viz={viz} />
      </div>
    </div>
  );
};

export default hot(module)(App);
