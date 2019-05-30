interface ISuccess<T> {
  tag: 'success';
  value: T;
}

interface IFailure<T> {
  tag: 'failure';
  value: T;
}

type Either<S, T> = ISuccess<S> | IFailure<T>;

interface IRawSpec {
  data: any;
  mark: string;
}

interface IBaseSpec {
  spec: IRawSpec;
  alias: string;
  id: number;
}

interface IState {
  specs: IBaseSpec[];
  lastSpecId: number;
  operands: number[];
  tree: View | null;
}

type Operator = 'layer' | 'concat' | 'repeat' | 'facet' | 'place';

interface IGlobalState {
  undoStack: IState[];
  redoStack: IState[];
  current: IState;
}
