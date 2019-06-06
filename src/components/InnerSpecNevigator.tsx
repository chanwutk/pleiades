import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { render } from './views/Renderer';
import { FacetView } from '../SyntaxTree/FacetView';
import { RepeatView } from '../SyntaxTree/RepeatView';
import { Switch } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  main: {
    backgroundColor: theme.palette.grey[200],
    marginTop: theme.spacing(1),
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  emptyView: {
    color: 'darkgrey',
    fontSize: 20,
  },
}));

export const InnerViewNavigator: React.FC = () => {
  const classes = useStyles();
  const [toShowInner, setToShowInner] = useState(false);
  const tree = useSelector((state: IGlobalState) => state.current.tree);
  const operands = useSelector((state: IGlobalState) => state.current.operands);
  const mainViewOperands = operands.filter(x => x > 0);

  const findResult =
    !!tree &&
    mainViewOperands.length === 1 &&
    tree.findView(mainViewOperands[0]);
  const currentView = !!findResult && findResult.view;

  const handleSwitchChange = event => setToShowInner(event.target.checked);

  return (
    <>
      <div style={{ height: 37 }}>
        Inner View Navigator
        <Switch checked={toShowInner} onChange={handleSwitchChange} />
      </div>
      <div className={classes.main}>
        {!!currentView && toShowInner ? (
          render(
            currentView instanceof RepeatView ||
              currentView instanceof FacetView
              ? (currentView as RepeatView | FacetView).getSubViews()[0]
              : currentView
          )
        ) : (
          <div className={classes.emptyView}>Empty View</div>
        )}
      </div>
    </>
  );
};
