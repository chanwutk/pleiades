import * as R from 'ramda';
import { UnitView, ViewHolder } from './SyntaxTree/View';
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
    case 'select-operand2-id': {
      return newGlobalState(
        globalState,
        R.over(R.lensProp('operand2Id'), R.always(action.operandId))
      );
    }
    case 'operate': {
      return newGlobalState(
        globalState,
        R.pipe(
          R.over(R.lensProp('result'), (result: ViewHolder) => {
            if (action.operator === 'place') {
              return new ViewHolder(new UnitView(action.operand1));
            }

            const newTree = result.clone();
            const operand2ViewHolder = newTree.findView(
              action.operand2Id === null ? -1 : action.operand2Id
            );

            if (!operand2ViewHolder) {
              throw new Error('focusing node is null expecting ViewHolder');
            }

            switch (action.operator) {
              case 'layer':
                const operand1View = new UnitView(action.operand1);
                if (
                  operand2ViewHolder.view instanceof LayerView &&
                  operand2ViewHolder.view.isCompatible(operand1View)
                ) {
                  operand2ViewHolder.view.append(operand1View);
                } else {
                  const layer = new LayerView();
                  if (
                    layer.isCompatible(operand1View) &&
                    operand2ViewHolder.view instanceof UnitView &&
                    layer.isCompatible(operand2ViewHolder.view)
                  ) {
                    layer.append(operand2ViewHolder.view);
                    layer.append(operand1View);
                    operand2ViewHolder.view = layer;
                  }
                }
                break;
              case 'concat':
                break;
              case 'repeat':
                break;
              case 'facet':
                break;
              default:
                return assertNever(action.operator);
            }
            return newTree;
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
    operand2Id: null,
    result: null,
  },
  undoStack: [],
  redoStack: [],
};
