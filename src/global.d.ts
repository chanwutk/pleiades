interface ISuccess<T> {
  tag: 'success';
  value: T;
}

interface IFailure<T> {
  tag: 'failure';
  value: T;
}

type Either<S, T> = ISuccess<S> | IFailure<T>;

interface IBaseSpec {
  spec: any;
  alias: string;
  id: number;
}

interface IState {
  specs: IBaseSpec[];
  specCount: number;
  operand1Id: number | null;
  operand2: any;
  result: ViewHolder | null;
}

type Operator = 'layer' | 'concat' | 'repeat' | 'facet' | 'place';

interface IGlobalState {
  undoStack: IState[];
  redoStack: IState[];
  current: IState;
}

type Reducer = React.Reducer<IGlobalState, Action>;
