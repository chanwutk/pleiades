interface Success<T> {
  tag: 'success';
  value: T;
}

interface Failure<T> {
  tag: 'failure';
  value: T;
}

type Either<S, T> = Success<S> | Failure<T>;
