declare module '*.scss';

interface Success<T> {
  tag: 'success';
  value: T;
}

interface Failure<T> {
  tag: 'failure';
  value: T;
}

interface RawSpec {
  spec: any;
  alias: string;
  id: number;
}

interface State {
  specs: RawSpec[];
  specCount: number;
}

type Either<S, T> = Success<S> | Failure<T>;
