import { View, ViewHolder } from './SyntaxTree/View';
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
  mode: Mode;
  mainViewElements: ViewHolder | null;
}

type Mode = "initial" | "layer" | "concat" | "repeat" | "facet" | null;

type Either<S, T> = Success<S> | Failure<T>;
