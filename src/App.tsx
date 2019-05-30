import React, { useReducer } from 'react';
import { hot } from 'react-hot-loader';
import { makeStyles } from '@material-ui/core/styles';

import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import { MainView } from './components/MainView';
import { OperationBar } from './components/OperationBar';
import { sidebarWidth } from './variables';
import { AppDispatch } from './contexts';
import { reducer, initialState } from './reducer';

const useStyles = makeStyles(theme => ({
  root: {
    height: 600,
    display: 'flex',
  },
  left: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: sidebarWidth,
    marginRight: theme.spacing(1),
  },
  right: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const App: React.FC = () => {
  const [state, dispatch] = useReducer<Reducer>(reducer, initialState);

  const classes = useStyles();

  return (
    <AppDispatch.Provider value={dispatch}>
      <div className={classes.root}>
        <div className={classes.left}>
          <NewSpec />
          <NavigationBar currentState={state.current} />
        </div>
        <div className={classes.right}>
          <OperationBar
            operands={state.current.operands}
            tree={state.current.tree}
            undoDisabled={state.undoStack.length === 0}
            redoDisabled={state.redoStack.length === 0}
          />
          <MainView
            tree={state.current.tree}
            operands={state.current.operands}
          />
        </div>
      </div>
    </AppDispatch.Provider>
  );
};

export default hot(module)(App);
