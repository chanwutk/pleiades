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
  id: number;
}

type Either<S, T> = Success<S> | Failure<T>;
