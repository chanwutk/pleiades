import * as reactRedux from 'react-redux';
import { Action, Dispatch, AnyAction } from 'redux';

declare module 'react-redux' {
  function useDispatch<A extends Action = AnyAction>(): Dispatch<A>;
  function useSelector<TState, TSelected>(
    selector: (state: TState) => TSelected,
    equalityFn?: (left: TSelected, right: TSelected) => boolean
  ): TSelected;
  function shallowEqual<T>(left: T, right: T): boolean;
}
