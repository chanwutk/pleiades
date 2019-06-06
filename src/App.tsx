import React from 'react';
import { hot } from 'react-hot-loader';
import { makeStyles } from '@material-ui/core/styles';

import { NavigationBar } from './components/NavigationBar';
import { NewSpec } from './components/NewSpec';
import { MainView } from './components/MainView';
import { OperationBar } from './components/OperationBar';
import { sidebarWidth } from './variables';
import { Provider } from 'react-redux';
import { store } from './store';
import { InnerViewNavigator } from './components/InnerSpecNevigator';

const useStyles = makeStyles(theme => ({
  root: {
    height: 540,
    display: 'flex',
  },
  left: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    width: sidebarWidth,
    marginRight: theme.spacing(1),
  },
  center: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: sidebarWidth * 2,
    alignItems: 'center',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Provider store={store}>
      <div className={classes.root}>
        <div className={classes.left}>
          <NewSpec />
          <NavigationBar />
        </div>
        <div className={classes.center}>
          <OperationBar />
          <MainView />
        </div>
        &nbsp;
        <div className={classes.right}>
          <InnerViewNavigator />
        </div>
      </div>
    </Provider>
  );
};

export default hot(module)(App);
