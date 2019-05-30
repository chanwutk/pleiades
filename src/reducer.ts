import * as R from 'ramda';
import { UnitView } from './SyntaxTree/View';
import { assertNever } from './utils';
import { LayerView } from './SyntaxTree/LayerView';
import { View } from './SyntaxTree/View';
import { ConcatView } from './SyntaxTree/ConcatView';

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
      return newGlobalState(globalState, ({ specs, lastSpecId, ...rest }) => ({
        specs: R.append(
          { id: lastSpecId, spec: action.json, alias: action.alias },
          specs
        ),
        lastSpecId: lastSpecId - 1,
        ...rest,
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
        R.pipe(
          R.over(
            R.lensProp('specs'),
            R.filter((spec: IBaseSpec) => spec.id !== action.id)
          ),
          R.over(R.lensProp('operands'), (operands: number[]) =>
            operands.filter(id => id !== action.id)
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
    case 'select-operand': {
      return newGlobalState(
        globalState,
        R.over(R.lensProp('operands'), operands => {
          if (operands.includes(action.operand)) {
            return R.without([action.operand], operands);
          } else {
            return R.append(action.operand, operands);
          }
        })
      );
    }
    case 'operate': {
      return newGlobalState(
        globalState,
        R.pipe(
          R.over(R.lensProp('tree'), (tree: View) => {
            const findInNav = (id: number) =>
              globalState.current.specs.find(spec => spec.id === id)!.spec;

            const left = action.operands.filter(id => id < 0);
            const right = action.operands.filter(id => id > 0);

            if (action.operator === 'place') {
              return new UnitView(findInNav(left[0]));
            }

            let rightView = tree.findView(right[0])!.clone();

            switch (action.operator) {
              case 'layer': {
                const leftView = new UnitView(findInNav(left[0]));
                if (
                  rightView instanceof LayerView &&
                  rightView.isCompatible(leftView)
                ) {
                  rightView.append(leftView);
                } else {
                  const layer = new LayerView();
                  if (
                    layer.isCompatible(leftView) &&
                    rightView instanceof UnitView &&
                    layer.isCompatible(rightView)
                  ) {
                    layer.append(rightView);
                    layer.append(leftView);
                    rightView = layer;
                  }
                }
                break;
              }
              case 'concat': {
                const leftView = new UnitView(findInNav(left[0]));
                if (
                  rightView instanceof ConcatView &&
                  rightView.isCompatible(leftView)
                ) {
                  rightView.append(leftView);
                } else {
                  const concat = new ConcatView('h');
                  if (
                    concat.isCompatible(leftView) &&
                    rightView instanceof UnitView &&
                    concat.isCompatible(rightView)
                  ) {
                    concat.append(rightView);
                    concat.append(leftView);
                    rightView = concat;
                  }
                }
                break;
              }
              case 'repeat':
                break;
              case 'facet':
                break;
              default:
                return assertNever(action.operator);
            }
            return rightView;
          }),
          R.over(R.lensProp('operands'), R.always([]))
        )
      );
    }
    default:
      throw new Error('impossible');
  }
};

// NOTE: invariants: navbar has negative id
// and view has positive id

export const initialState: IGlobalState = {
  current: {
    specs: [],
    lastSpecId: -1,
    operands: [],
    tree: null,
  },
  undoStack: [],
  redoStack: [],
};
