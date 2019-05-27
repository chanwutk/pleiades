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
  mode: Mode;
  mainViewElements: ViewHolder | null;
}

type Mode = 'initial' | 'layer' | 'concat' | 'repeat' | 'facet' | null;

interface IGlobalState {
  undoStack: IState[];
  redoStack: IState[];
  current: IState;
}

type Reducer = React.Reducer<IGlobalState, Action>;
