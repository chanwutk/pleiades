import { createStore } from 'redux';
import * as R from 'ramda';
import { UnitView } from './SyntaxTree/View';
import { assertNever } from './utils';
import { LayerView } from './SyntaxTree/LayerView';
import { View } from './SyntaxTree/View';
import { ConcatView } from './SyntaxTree/ConcatView';
import { RepeatView, RepeatInfo } from './SyntaxTree/RepeatView';
import { FacetView, FacetInfo } from './SyntaxTree/FacetView';

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

const initialState: IGlobalState = {
  current: {
    specs: [],
    lastSpecId: -1,
    operands: [],
    tree: null,
  },
  undoStack: [],
  redoStack: [],
};

const reducer = (globalState = initialState, action: Action): IGlobalState => {
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
            return R.append(
              action.operand,
              operands.filter(operand => operand * action.operand < 0)
            );
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

            let newTree = tree.deepClone();
            const rightViewResult = newTree.findView(right[0]);
            if (rightViewResult === null) {
              throw new Error(
                `Cannot find view in MainView with id=${right[0]}`
              );
            }

            let { parent, view } = rightViewResult;

            switch (action.operator) {
              case 'layer': {
                const leftView = new UnitView(findInNav(left[0]));
                const oldViewId = view.id;
                if (view instanceof UnitView) {
                  const layer = new LayerView();
                  layer.append(view);
                  view = layer;
                }
                (view as LayerView)[action.extra](leftView);
                if (parent) {
                  parent.replaceChild(view, oldViewId);
                } else {
                  newTree = view;
                }
                break;
              }
              case 'concat': {
                const leftView = new UnitView(findInNav(left[0]));
                const oldViewId = view.id;
                const { orient, option } = action.extra;

                if (
                  !(view instanceof ConcatView) ||
                  view.getOrient() !== orient
                ) {
                  const concat = new ConcatView(orient);
                  concat.append(view);
                  view = concat;
                }
                (view as ConcatView)[option](leftView);
                if (parent) {
                  parent.replaceChild(view, oldViewId);
                } else {
                  newTree = view;
                }
                break;
              }
              case 'repeat':
                const repeat = new RepeatView(view, action.extra as RepeatInfo);
                if (parent) {
                  parent.replaceChild(repeat, view.id);
                } else {
                  newTree = repeat;
                }
                break;
              case 'facet':
                const facet = new FacetView(view, action.extra as FacetInfo);
                if (parent) {
                  parent.replaceChild(facet, view.id);
                } else {
                  newTree = facet;
                }
                break;
              default:
                return assertNever(action.operator);
            }
            return newTree;
          }),
          R.over(R.lensProp('operands'), R.always([]))
        )
      );
    }
    case 'decompose': {
      return newGlobalState(
        globalState,
        R.pipe(
          R.over(R.lensProp('tree'), tree => {
            let newTree = (tree as View).deepClone();
            const { parent, view } = newTree.findView(action.operand)!;
            if (view instanceof RepeatView || view instanceof FacetView) {
              const [subView] = view.getSubViews();
              if (parent) {
                parent.replaceChild(subView, action.operand);
              } else {
                newTree = subView;
              }
            }
            return newTree;
          }),
          R.over(R.lensProp('operands'), R.always([]))
        )
      );
    }
    case 'modify-info': {
      return newGlobalState(
        globalState,
        R.pipe(
          R.over(R.lensProp('tree'), tree => {
            let newTree = (tree as View).deepClone();
            const { view } = newTree.findView(action.operand)!;
            if (view instanceof FacetView) {
              view.changeInfo(action.info);
            } else if (view instanceof RepeatView) {
              view.changeInfo(action.info);
            }
            return newTree;
          }),
          R.over(R.lensProp('operands'), R.always([]))
        )
      );
    }
    case 'rearrange-subview': {
      return newGlobalState(
        globalState,
        R.pipe(
          R.over(R.lensProp('tree'), tree => {
            let newTree = (tree as View).deepClone();
            const { parent, view } = newTree.findView(action.operand)!;
            if (view instanceof ConcatView || view instanceof LayerView) {
              const newView =
                view instanceof LayerView
                  ? new LayerView()
                  : new ConcatView(action.orient ? action.orient : 'h');

              const subViewMap = {};
              view
                .getSubViews()
                .forEach(subView => (subViewMap[subView.id] = subView));

              action.order.forEach(subViewId => {
                if (subViewId in subViewMap) {
                  newView.append(subViewMap[subViewId]);
                } else {
                  console.error('subViewId is not in subViewMap');
                }
              });

              if (parent) {
                parent.replaceChild(newView, action.operand);
              } else {
                newTree = newView;
              }
            }
            return newTree;
          }),
          R.over(R.lensProp('operands'), R.always([]))
        )
      );
    }
    default:
      return globalState;
  }
};

// NOTE: invariants: navbar has negative id
// and view has positive id

export const store = createStore<IGlobalState, Action, {}, {}>(reducer);
