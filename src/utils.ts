import { Success, Failure } from "./global";

export const success = <T>(x: T): Success<T> => ({ tag: 'success', value: x });
export const failure = <T>(x: T): Failure<T> => ({ tag: 'failure', value: x });
export const last = <T>(xs: T[]) => xs[xs.length - 1];
