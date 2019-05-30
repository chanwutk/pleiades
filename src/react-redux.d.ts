import * as reactRedux from 'react-redux';
import { Action, Dispatch, AnyAction } from 'redux';

type UseSelector = <TState, TSelected>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;

declare module 'react-redux' {
  function useDispatch<A extends Action = AnyAction>(): Dispatch<A>;
  const useSelector: UseSelector;
  function shallowEqual<T>(left: T, right: T): boolean;
}
