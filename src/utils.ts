export const success = <T>(x: T): ISuccess<T> => ({ tag: 'success', value: x });
export const failure = <T>(x: T): IFailure<T> => ({ tag: 'failure', value: x });
export const last = <T>(xs: T[]) => xs[xs.length - 1];
