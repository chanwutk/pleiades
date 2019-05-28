import * as R from 'ramda';

const newGlobalState = (
  oldState: IGlobalState,
  getCurrent: (current: IState) => IState
) => {
  return {
    current: getCurrent(oldState.current),
    undoStack: R.prepend(oldState.current, oldState.undoStack),
    redoStack: []
  };
};

export const reducer: Reducer = (globalState, action) => {
  switch (action.type) {
    case 'add-spec':
      return newGlobalState(globalState, ({ specs, specCount, ...rest }) => ({
        specs: R.append(
          { id: specCount, spec: action.json, alias: action.alias },
          specs
        ),
        specCount: specCount + 1,
        ...rest
      }));

    case 'modify-spec':
      return newGlobalState(
        globalState,
        R.over(
          R.lensProp('specs'),
          R.map(
            (spec: IBaseSpec) =>
              spec.id === action.id
                ? { id: action.id, spec: action.json, alias: action.alias }
                : spec
          )
        )
      );
    case 'delete-spec':
      return newGlobalState(
        globalState,
        R.over(
          R.lensProp('specs'),
          R.filter((spec: IBaseSpec) => spec.id !== action.id)
        )
      );
    case 'undo': {
      const { current, undoStack, redoStack } = globalState;
      if (undoStack.length > 0) {
        return {
          redoStack: R.prepend(current, redoStack),
          current: undoStack[0],
          undoStack: undoStack.slice(1)
        };
      } else {
        return globalState;
      }
    }
    case 'redo': {
      const { current, undoStack, redoStack } = globalState;
      if (redoStack.length > 0) {
        return {
          redoStack: redoStack.slice(1),
          current: redoStack[0],
          undoStack: R.prepend(current, undoStack)
        };
      } else {
        return globalState;
      }
    }
    case 'select-mode': {
      return newGlobalState(
        globalState,
        R.over(R.lensProp('mode'), _ => action.mode)
      );
    }
    case 'modify-view': {
      return newGlobalState(
        globalState,
        R.over(
          R.lensProp('mainViewElements'),
          _ => action.newView
        )
      );
    }
    default:
      throw new Error('impossible');
  }
};

export const initialState: IGlobalState = {
  current: {
    specs: [],
    specCount: 0,
    mode: 'initial',
    mainViewElements: null
  },
  undoStack: [],
  redoStack: []
};
