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
  specs: RawSpec[];
  specCount: number;
}

interface IGlobalState {
  undoStack: IState[];
  redoStack: IState[];
  current: IState;
}

type Reducer = React.Reducer<IGlobalState, Action>;
