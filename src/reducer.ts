import * as R from 'ramda';
import { UnitViewHolder, UnitView } from './SyntaxTree/View';
import { assertNever } from './utils';
import { LayerView } from './SyntaxTree/LayerView';

const newGlobalState = (
  oldState: IGlobalState,
  getCurrent: (current: IState) => IState
) => {
  return {
    current: getCurrent(oldState.current),
    undoStack: R.prepend(oldState.current, oldState.undoStack),
    redoStack: [],
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
        ...rest,
      }));

    case 'modify-spec':
      return newGlobalState(
        globalState,
        R.over(
          R.lensProp('specs'),
          R.map((spec: IBaseSpec) =>
            spec.id === action.id
              ? { id: action.id, spec: action.json, alias: action.alias }
              : spec
          )
        )
      );
    case 'delete-spec':
      return newGlobalState(
        globalState,
        R.pipe(
          R.over(
            R.lensProp('specs'),
            R.filter((spec: IBaseSpec) => spec.id !== action.id)
          ),
          R.over(R.lensProp('operand1Id'), operand1Id =>
            operand1Id === action.id ? null : operand1Id
          )
        )
      );
    case 'undo': {
      const { current, undoStack, redoStack } = globalState;
      if (undoStack.length > 0) {
        return {
          redoStack: R.prepend(current, redoStack),
          current: undoStack[0],
          undoStack: undoStack.slice(1),
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
          undoStack: R.prepend(current, undoStack),
        };
      } else {
        return globalState;
      }
    }
    case 'select-operand1': {
      return newGlobalState(
        globalState,
        R.over(R.lensProp('operand1Id'), R.always(action.id))
      );
    }
    case 'select-operand2': {
      return newGlobalState(
        globalState,
        R.over(R.lensProp('operand2'), R.always(action.operand))
      );
    }
    case 'operate': {
      return newGlobalState(
        globalState,
        R.pipe(
          R.over(R.lensProp('result'), result => {
            // There is still a cloning issue that make undo crash
            // need more discussion on this.
            globalState.current.result = R.clone(result);
            switch (action.operator) {
              case 'place':
                return new UnitViewHolder(new UnitView(action.operand1));
              case 'layer':
                const layer = new LayerView();
                const operand1View = new UnitView(action.operand1);
                if (
                  layer.isCompatible(operand1View) &&
                  layer.isCompatible(action.operand2.view)
                ) {
                  layer.append(action.operand2.view);
                  layer.append(operand1View);
                  action.operand2.view = layer;
                }
                return result;
              case 'concat':
                return result;
              case 'repeat':
                return result;
              case 'facet':
                return result;
              default:
                return assertNever(action.operator);
            }
          }),
          R.over(R.lensProp('operand1Id'), R.always(null)),
          R.over(R.lensProp('operand2'), R.always(null))
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
    operand1Id: null,
    operand2: null,
    result: null,
  },
  undoStack: [],
  redoStack: [],
};
